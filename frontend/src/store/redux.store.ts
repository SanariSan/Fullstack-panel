import { configureStore } from '@reduxjs/toolkit';
import { fetchTodo, notes, theme } from './slices';

const StoreToolkit = configureStore({
  reducer: {
    notes,
    fetchTodo,
    theme,
  },
  // https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // .concat(logger)
});

export { StoreToolkit };
