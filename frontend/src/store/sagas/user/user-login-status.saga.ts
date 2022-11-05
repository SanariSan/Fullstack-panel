import { call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import { request } from '../../../services';
import {
  checkUserSessionStatusAsync,
  setUserLoadStatusIdle,
  setUserLoadStatusLoading,
  setUserSessionCheckStatus,
  setUserLoadStatusFailure,
} from '../../slices';

async function checkUserSessionStatus(abortSignal: AbortSignal) {
  return request({
    url: `http://127.0.0.1:3000/v1/access/login`,
    abortSignal,
  });
}

function* checkUserSessionStatusWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUserLoadStatusLoading());

    const fetchStatus = (yield safe(
      call(checkUserSessionStatus, abortController.signal),
    )) as TSafeReturn<Response>;

    if (fetchStatus.error !== undefined) {
      yield put(setUserLoadStatusFailure({ error: fetchStatus.error }));
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
      yield put(setUserLoadStatusFailure({ error: jsonParse.error }));
      return;
    }

    yield put(setUserSessionCheckStatus(jsonParse.response));

    // if no delay used - setIdle from finally block instantly overrides success
    yield delay(1);
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
    yield put(setUserLoadStatusIdle());
  }
}

function* userSessionStatusWatcher() {
  yield takeLatest(checkUserSessionStatusAsync, checkUserSessionStatusWorker);
}

export { userSessionStatusWatcher };

// let task: Task | undefined;
// while (true) {
//   // type, payload
//   const action = (yield take(getUserLoginStatusAsync)) as {
//     type: string;
//   };

//   if (task !== undefined) {
//     yield cancel(task);
//   }

//   task = (yield fork(getUserLoginStatusWorker, action)) as Task;
// }
