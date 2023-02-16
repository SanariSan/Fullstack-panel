import { all, call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type {
  IAccessCheckSessionIncomingFailureDM,
  IAccessCheckSessionIncomingSuccessDM,
  IAccessLoginIncomingFailureDM,
  IAccessLoginIncomingSuccessDM,
  IAccessLoginOutgoingDM,
  IAccessLogoutIncomingFailureDM,
  IAccessLogoutIncomingSuccessDM,
  IAccessRegisterIncomingFailureDM,
  IAccessRegisterIncomingSuccessDM,
  IAccessRegisterOutgoingDM,
} from '../../../../data-models';
import {
  AccessCheckSessionIncomingFailureDM,
  AccessCheckSessionIncomingSuccessDM,
  AccessLoginIncomingFailureDM,
  AccessLoginIncomingSuccessDM,
  AccessLogoutIncomingFailureDM,
  AccessLogoutIncomingSuccessDM,
  AccessRegisterIncomingFailureDM,
  AccessRegisterIncomingSuccessDM,
} from '../../../../data-models';
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
      call(checkUserSession, { abortSignal: abortController.signal }),
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

function* loginUserWorker(action: { type: string; payload: IAccessLoginOutgoingDM }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(loginUser, { dm: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<IAccessLoginIncomingSuccessDM | IAccessLoginIncomingFailureDM>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof AccessLoginIncomingSuccessDM) {
      yield put(setUserAuthLoadStatus({ status: 'success' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.getFields().data.isAuthenticated }),
      );
      yield put(setUserInfo(fetchStatus.response.getFields().data));
      return;
    }

    if (fetchStatus.response instanceof AccessLoginIncomingFailureDM) {
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

function* logoutUserWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(logoutUser, { abortSignal: abortController.signal }),
    )) as TSafeReturn<IAccessLogoutIncomingSuccessDM | IAccessLogoutIncomingFailureDM>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof AccessLogoutIncomingSuccessDM) {
      yield put(setUserAuthLoadStatus({ status: 'success' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.getFields().data.isAuthenticated }),
      );
      return;
    }

    if (fetchStatus.response instanceof AccessLogoutIncomingFailureDM) {
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
