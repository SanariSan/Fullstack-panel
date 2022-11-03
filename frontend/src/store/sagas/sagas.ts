import { all } from 'redux-saga/effects';
import { userWatcher } from './user.saga';

function* rootWatcher() {
  yield all([userWatcher()]);
}

export { rootWatcher };
