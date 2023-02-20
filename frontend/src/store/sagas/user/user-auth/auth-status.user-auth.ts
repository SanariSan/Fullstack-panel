import { call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import type {
  IAccessCheckSessionIncomingFailureDM,
  IAccessCheckSessionIncomingSuccessDM,
} from '../../../../services/api';
import {
  AccessCheckSessionIncomingFailureDM,
  AccessCheckSessionIncomingSuccessDM,
  checkUserAuthStatus,
} from '../../../../services/api';
import { checkUserAuthStatusAsync, setUserIsAuthenticated } from '../../../slices';

function* checkUserAuthStatusWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield delay(1000);

    const fetchStatus = (yield safe(
      call(checkUserAuthStatus, { abortSignal: abortController.signal }),
    )) as TSafeReturn<IAccessCheckSessionIncomingSuccessDM | IAccessCheckSessionIncomingFailureDM>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserIsAuthenticated({ status: false }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof AccessCheckSessionIncomingSuccessDM) {
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.getFields().data.isAuthenticated }),
      );
      return;
    }

    if (fetchStatus.response instanceof AccessCheckSessionIncomingFailureDM) {
      yield put(
        setUserIsAuthenticated({
          status: fetchStatus.response.getFields().miscellaneous.isAuthenticated,
        }),
      );
      return;
    }
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* userAuthStatusWatcher() {
  yield takeLatest(checkUserAuthStatusAsync, checkUserAuthStatusWorker);
}

export { userAuthStatusWatcher };
