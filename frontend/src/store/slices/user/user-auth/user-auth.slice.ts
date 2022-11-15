import { createSlice } from '@reduxjs/toolkit';
import { USER_AUTH_INIT_STATE } from './user-auth.slice.const';

/* eslint-disable no-param-reassign */

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: USER_AUTH_INIT_STATE,
  reducers: {
    setUserAuthLoadStatusIdle(state) {
      state.loadingStatus = 'idle';
    },
    setUserAuthLoadStatusLoading(state) {
      state.loadingStatus = 'loading';
    },
    setUserAuthLoadStatusFailure(state, action: { payload: { error: unknown }; type: string }) {
      state.loadingStatus = 'failure';
      state.error = JSON.stringify(action.payload.error);
    },
    setUserAuthLoadStatusSuccess(state, action: { payload: undefined; type: string }) {
      state.loadingStatus = 'success';
    },
    registerUserAsync(
      state,
      action: { payload: { login: string; password: string }; type: string },
    ) {},
    loginUserAsync(
      state,
      action: { payload: { login: string; password: string }; type: string },
    ) {},
  },
});

const userAuth = userAuthSlice.reducer;
const {
  setUserAuthLoadStatusIdle,
  setUserAuthLoadStatusLoading,
  setUserAuthLoadStatusFailure,
  setUserAuthLoadStatusSuccess,
  registerUserAsync,
  loginUserAsync,
} = userAuthSlice.actions;

export {
  userAuth,
  setUserAuthLoadStatusIdle,
  setUserAuthLoadStatusLoading,
  setUserAuthLoadStatusFailure,
  setUserAuthLoadStatusSuccess,
  registerUserAsync,
  loginUserAsync,
};
