import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './sagas';
import { loginUserAsync, registerUserAsync, theme, user } from './slices';

const sagaMiddleware = createSagaMiddleware({
  effectMiddlewares: [
    (next) => (action) => {
      // console.dir(action);
      // console.log({
      //   userType: action.payload?.args?.[0]?.type,
      //   userPayload: action.payload?.args?.[0]?.payload,
      // });
      next(action);
    },
  ],
});

const ignoreSerializableCheckActions = [registerUserAsync, loginUserAsync].map((_) => _.toString());
const Store = configureStore({
  reducer: {
    theme,
    user,
    // fetchTodo,
  },
  // because concat preserves types, spread not
  // https://redux-toolkit.js.org/api/getDefaultMiddleware
  /* eslint-disable unicorn/prefer-spread */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist
        ignoredActions: ignoreSerializableCheckActions,
        // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  /* eslint-enable unicorn/prefer-spread */
});

sagaMiddleware.run(rootWatcher);

export { Store };
