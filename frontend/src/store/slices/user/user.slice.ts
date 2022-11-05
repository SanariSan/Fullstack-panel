import { createSlice } from '@reduxjs/toolkit';
import { USER_INIT_STATE } from './user.slice.const';

/* eslint-disable no-param-reassign */

const userSlice = createSlice({
  name: 'user',
  initialState: USER_INIT_STATE,
  reducers: {
    setUserLoadStatusIdle(state) {
      state.loadingStatus = 'idle';
    },
    setUserLoadStatusLoading(state) {
      state.loadingStatus = 'loading';
    },
    setUserLoadStatusFailure(state, action: { payload: { error: unknown }; type: string }) {
      state.loadingStatus = 'failure';
      state.error = JSON.stringify(action.payload.error);
      console.log(action.payload.error);
    },
    setUserSessionCheckStatus(
      state,
      action: { payload: { isAuthenticated: boolean; login?: string }; type: string },
    ) {
      state.loadingStatus = 'success';
      state.isAuthenticated = action.payload.isAuthenticated;
      state.login = action.payload.login ?? state.login;
    },
    checkUserSessionStatusAsync() {},
  },
});

const user = userSlice.reducer;
const {
  setUserLoadStatusIdle,
  setUserLoadStatusLoading,
  setUserLoadStatusFailure,
  setUserSessionCheckStatus,
  checkUserSessionStatusAsync,
} = userSlice.actions;

export {
  user,
  setUserLoadStatusIdle,
  setUserLoadStatusLoading,
  setUserLoadStatusFailure,
  setUserSessionCheckStatus,
  checkUserSessionStatusAsync,
};
