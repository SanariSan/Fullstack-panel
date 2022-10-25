import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../../../services';
import type { TInitialState, TInitialStateThunk } from './fetch-todo.slice.type';

/* eslint-disable no-param-reassign */

const initialState: TInitialState = {
  todos: [],
  lastFetchedId: 0,
  status: 'idle',
  error: undefined,
};

const fetchOneTodo = createAsyncThunk(
  'fetchTodo/fetchOneTodo',
  async (_: undefined, { getState, signal }) => {
    try {
      const state = getState() as TInitialStateThunk;
      const { lastFetchedId } = state.fetchTodo;

      const response = await request({
        url: `https://jsonplaceholder.typicode.com/todos/${String(lastFetchedId + 1)}`,
        abortSignal: signal,
      });
      const json = (await response.json()) as Record<string, unknown>;
      return json;
    } catch (error: unknown) {
      console.log(`Req error in thunk _ ${String(error)}`);
      // console.log(error);
      throw error;
    }
  },
  {
    condition: (_: undefined, { getState }) => {
      const state = getState() as TInitialStateThunk;
      const { status } = state.fetchTodo;

      if (['loading', 'succeeded', 'failed'].includes(status)) {
        return false;
      }
      return true;
    },
  },
);

const fetchTodoSlice = createSlice({
  name: 'fetchTodo',
  initialState,
  reducers: {
    setIdle(state) {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOneTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOneTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastFetchedId += 1;
        state.todos.push(action.payload);
      })
      .addCase(fetchOneTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const fetchTodo = fetchTodoSlice.reducer;
const { setIdle } = fetchTodoSlice.actions;

export { fetchTodo, fetchOneTodo, setIdle };
