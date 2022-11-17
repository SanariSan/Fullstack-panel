import { all, call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { request } from '../../../../services';
import {
  checkUserSessionAsync,
  loginUserAsync,
  logoutUserAsync,
  registerUserAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';

type TAuthBody = { login: string; password: string };

async function checkUserSession(abortSignal: AbortSignal) {
  return request({
    url: `http://127.0.0.1:3000/v1/access/login`,
    abortSignal,
  });
}

async function loginUser({ body, abortSignal }: { body: TAuthBody; abortSignal: AbortSignal }) {
  return request({
    url: `http://127.0.0.1:3000/v1/access/login`,
    method: 'POST',
    body: JSON.stringify(body),
    abortSignal,
  });
}

async function registerUser({ body, abortSignal }: { body: TAuthBody; abortSignal: AbortSignal }) {
  return request({
    url: `http://127.0.0.1:3000/v1/access/register`,
    method: 'POST',
    body: JSON.stringify(body),
    abortSignal,
  });
}

async function logoutUser(abortSignal: AbortSignal) {
  return request({
    url: `http://127.0.0.1:3000/v1/access/logout`,
    method: 'DELETE',
    abortSignal,
  });
}

function* checkUserSessionWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield delay(1000);

    const fetchStatus = (yield safe(
      call(checkUserSession, abortController.signal),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserIsAuthenticated({ status: false }));
      return;
    }

    /* eslint-disable @typescript-eslint/unbound-method */
    const jsonParse = (yield safe(
      call([fetchStatus.response, fetchStatus.response.json]),
    )) as TSafeReturn<{
      isAuthenticated: boolean;
      login?: string;
    }>;

    if (jsonParse.error !== undefined) {
      yield put(setUserIsAuthenticated({ status: false }));
      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserIsAuthenticated({ status: jsonParse.response.isAuthenticated }));
    yield put(setUserInfo(jsonParse.response));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* loginUserWorker(action: { type: string; payload: TAuthBody }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(loginUser, { body: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    /* eslint-disable @typescript-eslint/unbound-method */
    const jsonParse = (yield safe(
      call([fetchStatus.response, fetchStatus.response.json]),
    )) as TSafeReturn<{
      isAuthenticated: boolean;
      login?: string;
    }>;

    if (jsonParse.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserAuthLoadStatus({ status: 'success' }));
    yield put(setUserIsAuthenticated({ status: jsonParse.response.isAuthenticated }));
    yield put(setUserInfo(jsonParse.response));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* registerUserWorker(action: { type: string; payload: TAuthBody }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(registerUser, { body: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    /* eslint-disable @typescript-eslint/unbound-method */
    const jsonParse = (yield safe(
      call([fetchStatus.response, fetchStatus.response.json]),
    )) as TSafeReturn<{
      isAuthenticated: boolean;
      login?: string;
    }>;

    if (jsonParse.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserAuthLoadStatus({ status: 'success' }));
    yield put(setUserIsAuthenticated({ status: jsonParse.response.isAuthenticated }));
    yield put(setUserInfo(jsonParse.response));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* logoutUserWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    const fetchStatus = (yield safe(
      call(logoutUser, abortController.signal),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      return;
    }

    /* eslint-disable @typescript-eslint/unbound-method */
    const jsonParse = (yield safe(
      call([fetchStatus.response, fetchStatus.response.json]),
    )) as TSafeReturn<{
      isAuthenticated: boolean;
    }>;

    if (jsonParse.error !== undefined) {
      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserIsAuthenticated({ status: jsonParse.response.isAuthenticated }));
    yield put(setUserInfo({ login: undefined }));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* userSessionWatcher() {
  yield takeLatest(checkUserSessionAsync, checkUserSessionWorker);
}

function* userLoginWatcher() {
  yield takeLatest(loginUserAsync, loginUserWorker);
}

function* userRegisterWatcher() {
  yield takeLatest(registerUserAsync, registerUserWorker);
}

function* userLogoutWatcher() {
  yield takeLatest(logoutUserAsync, logoutUserWorker);
}

function* userAuthRootWatcher() {
  yield all([
    call(userSessionWatcher),
    call(userLoginWatcher),
    call(userRegisterWatcher),
    call(userLogoutWatcher),
  ]);
}

export { userAuthRootWatcher };
