import { all, call, spawn } from 'redux-saga/effects';
import { userAuthRootWatcher } from './user';

function* rootWatcher() {
  const sagas = [userAuthRootWatcher];

  yield all(
    sagas.map((saga) =>
      spawn(function* detachedGenerator() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            console.log(error);
          }
        }
      }),
    ),
  );
}

export { rootWatcher };
