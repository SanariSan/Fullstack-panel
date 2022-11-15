import { all, call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { request } from '../../../../services';
import {
  loginUserAsync,
  setUserAuthLoadStatusFailure,
  setUserAuthLoadStatusIdle,
  setUserAuthLoadStatusLoading,
  setUserAuthLoadStatusSuccess,
  setUserInfo,
} from '../../../slices';

async function loginUser({ body, abortSignal }: { body: any; abortSignal: AbortSignal }) {
  return request({
    url: `http://127.0.0.1:3000/v1/access/login`,
    method: 'POST',
    body: JSON.stringify(body),
    abortSignal,
  });
}

function* loginUserWorker(action: { type: string; payload: { login: string; password: string } }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatusLoading());

    const fetchStatus = (yield safe(
      call(loginUser, { body: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatusFailure({ error: String(fetchStatus.error) }));

      // if no delay used - setIdle instantly overrides failure
      yield delay(1);
      yield put(setUserAuthLoadStatusIdle());
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

      // if no delay used - setIdle instantly overrides failure
      yield delay(1);
      yield put(setUserAuthLoadStatusIdle());
      return;
    }

    // if no delay used - setIdle instantly overrides success
    yield put(setUserAuthLoadStatusSuccess());
    // yield put(setUserInfo(jsonParse.response));
    yield delay(1);
    yield put(setUserAuthLoadStatusIdle());
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
  // yield takeLatest(registerUserAsync, loginUserWorker);
}

function* userAuthRootWatcher() {
  yield all([call(userLoginWatcher), call(userRegisterWatcher)]);
}

export { userAuthRootWatcher };
