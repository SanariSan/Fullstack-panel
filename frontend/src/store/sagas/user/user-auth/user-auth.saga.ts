import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { request } from '../../../../services';
import {
  loginUserAsync,
  registerUserAsync,
  setUserAuthLoadStatusFailure,
  setUserAuthLoadStatusLoading,
  setUserAuthLoadStatusSuccess,
  setUserInfo,
  setUserSessionCheckLoadStatusSuccess,
} from '../../../slices';

type TAuthBody = { login: string; password: string };

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

function* loginUserWorker(action: { type: string; payload: TAuthBody }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatusLoading());

    const fetchStatus = (yield safe(
      call(loginUser, { body: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatusFailure({ error: String(fetchStatus.error) }));
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
      yield put(setUserAuthLoadStatusFailure({ error: String(jsonParse.error) }));
      return;
    }

    yield put(setUserAuthLoadStatusSuccess());
    yield put(setUserSessionCheckLoadStatusSuccess(jsonParse.response));
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
    yield put(setUserAuthLoadStatusLoading());

    const fetchStatus = (yield safe(
      call(registerUser, { body: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatusFailure({ error: String(fetchStatus.error) }));
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
      yield put(setUserAuthLoadStatusFailure({ error: String(jsonParse.error) }));
      return;
    }

    yield put(setUserAuthLoadStatusSuccess());
    yield put(setUserSessionCheckLoadStatusSuccess(jsonParse.response));
    yield put(setUserInfo(jsonParse.response));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* userLoginWatcher() {
  yield takeLatest(loginUserAsync, loginUserWorker);
}

function* userRegisterWatcher() {
  yield takeLatest(registerUserAsync, registerUserWorker);
}

function* userAuthRootWatcher() {
  yield all([call(userLoginWatcher), call(userRegisterWatcher)]);
}

export { userAuthRootWatcher };
