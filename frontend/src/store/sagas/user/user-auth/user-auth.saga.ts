import { all, call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { IAccessLoginFields, IAccessRegisterFields } from '../../../../data-models/outgoing';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { checkUserSession, loginUser, logoutUser, registerUser } from '../../../../services/api';
import {
  checkUserSessionAsync,
  loginUserAsync,
  logoutUserAsync,
  registerUserAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';

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

    console.log(fetchStatus);

    /* eslint-disable @typescript-eslint/unbound-method */
    const jsonParse = (yield safe(
      call([fetchStatus.response, fetchStatus.response.json]),
    )) as TSafeReturn<{
      data: {
        isAuthenticated: boolean;
        login?: string;
      };
    }>;

    if (jsonParse.error !== undefined) {
      yield put(setUserIsAuthenticated({ status: false }));
      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserIsAuthenticated({ status: jsonParse.response.data.isAuthenticated }));
    yield put(setUserInfo(jsonParse.response.data));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* loginUserWorker(action: { type: string; payload: IAccessLoginFields }) {
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
      data: {
        isAuthenticated: boolean;
        login?: string;
      };
    }>;

    if (jsonParse.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));

      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserAuthLoadStatus({ status: 'success' }));
    yield put(setUserIsAuthenticated({ status: jsonParse.response.data.isAuthenticated }));
    yield put(setUserInfo(jsonParse.response.data));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* registerUserWorker(action: { type: string; payload: IAccessRegisterFields }) {
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
      data: {
        isAuthenticated: boolean;
        login?: string;
      };
    }>;

    if (jsonParse.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserAuthLoadStatus({ status: 'success' }));
    yield put(setUserIsAuthenticated({ status: jsonParse.response.data.isAuthenticated }));
    yield put(setUserInfo(jsonParse.response.data));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* logoutUserWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(logoutUser, abortController.signal),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    /* eslint-disable @typescript-eslint/unbound-method */
    const jsonParse = (yield safe(
      call([fetchStatus.response, fetchStatus.response.json]),
    )) as TSafeReturn<{
      data: {
        isAuthenticated: boolean;
      };
    }>;

    if (jsonParse.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    // todo: STRICT CHECK PARSED JSON FIELDS

    yield put(setUserAuthLoadStatus({ status: 'success' }));
    yield put(setUserIsAuthenticated({ status: jsonParse.response.data.isAuthenticated }));
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
