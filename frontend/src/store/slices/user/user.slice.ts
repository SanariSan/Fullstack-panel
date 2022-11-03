import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../../../services';
import { USER_INIT_STATE } from './user.slice.const';
import type { TUserInitialStateThunk, TUserInitState } from './user.slice.type';

/* eslint-disable no-param-reassign */

const userSlice = createSlice({
  name: 'user',
  initialState: USER_INIT_STATE,
  reducers: {
    setProp(state, action: { payload: Partial<TUserInitState> }) {
      const { payload } = action;
      state.isAuthenticated = payload.isAuthenticated ?? state.isAuthenticated;
      state.login = payload.login ?? state.login;
    },
    setSuccess(state, action) {
      console.log(`userSlice | ${JSON.stringify(action)}`);
      state.status = 'succeeded';
      state.isAuthenticated = action.payload.isAuthenticated;
      state.login = action.payload.login ?? state.login;
    },
    getUserAsync(state, action: { payload: any }) {
      state.status = 'loading';
    },
  },
  // extraReducers(builder) {
  //   builder.addCase('user/', (state) => {
  //   });
  // },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchUserStatus.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchUserStatus.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.isAuthenticated = action.payload.isAuthenticated;
  //       state.login = action.payload.login ?? state.login;
  //     })
  //     .addCase(fetchUserStatus.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message;
  //     });
  // },
});

const user = userSlice.reducer;
const { setProp, setSuccess, getUserAsync } = userSlice.actions;

export { user, setProp, setSuccess, getUserAsync };
