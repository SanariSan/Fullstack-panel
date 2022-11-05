import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './sagas';
import { notes, theme, user } from './slices';

const sagaMiddleware = createSagaMiddleware();
const Store = configureStore({
  reducer: {
    notes,
    // fetchTodo,
    theme,
    user,
  },
  /* eslint-disable unicorn/prefer-spread */
  // because concat preserves types, spread not
  // https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  /* eslint-enable unicorn/prefer-spread */
});

sagaMiddleware.run(rootWatcher);

export { Store };
