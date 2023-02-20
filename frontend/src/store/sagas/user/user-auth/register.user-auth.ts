import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import type {
  IAccessRegisterIncomingFailureDM,
  IAccessRegisterIncomingSuccessDM,
  IAccessRegisterOutgoingDM,
} from '../../../../services/api';
import {
  AccessRegisterIncomingFailureDM,
  AccessRegisterIncomingSuccessDM,
  registerUser,
} from '../../../../services/api';
import {
  registerUserAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';

function* registerUserWorker(action: { type: string; payload: IAccessRegisterOutgoingDM }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(registerUser, { dm: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<IAccessRegisterIncomingSuccessDM | IAccessRegisterIncomingFailureDM>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof AccessRegisterIncomingSuccessDM) {
      yield put(setUserAuthLoadStatus({ status: 'success' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.getFields().data.isAuthenticated }),
      );
      yield put(setUserInfo(fetchStatus.response.getFields().data));
      return;
    }

    if (fetchStatus.response instanceof AccessRegisterIncomingFailureDM) {
      yield put(setUserAuthLoadStatus({ status: 'failure' }));
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

function* userRegisterWatcher() {
  yield takeLatest(registerUserAsync, registerUserWorker);
}

export { userRegisterWatcher };
