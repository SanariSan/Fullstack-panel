import { all, call } from 'redux-saga/effects';
import { userAuthStatusWatcher } from './auth-status.user-auth';
import { userLoginWatcher } from './login.user-auth';
import { userLogoutWatcher } from './logout.user-auth';
import { userRegisterWatcher } from './register.user-auth';

function* userAuthRootWatcher() {
  yield all([
    call(userAuthStatusWatcher),
    call(userLoginWatcher),
    call(userRegisterWatcher),
    call(userLogoutWatcher),
  ]);
}

export { userAuthRootWatcher };
