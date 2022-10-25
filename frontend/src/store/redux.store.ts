import { configureStore } from '@reduxjs/toolkit';
import { fetchTodo, notes } from './slices';

const StoreToolkit = configureStore({
  reducer: {
    notes,
    fetchTodo,
  },
  // https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // .concat(logger)
});

export { StoreToolkit };
