import { createSlice } from '@reduxjs/toolkit';
import { USER_SESSION_INIT_STATE } from './user-session.slice.const';

/* eslint-disable no-param-reassign */

const userSessionSlice = createSlice({
  name: 'userSession',
  initialState: USER_SESSION_INIT_STATE,
  reducers: {
    setUserSessionCheckLoadStatusIdle(state) {
      state.loadingStatus = 'idle';
    },
    setUserSessionCheckLoadStatusLoading(state) {
      state.loadingStatus = 'loading';
    },
    setUserSessionCheckLoadStatusFailure(
      state,
      action: { payload: { error: unknown }; type: string },
    ) {
      state.loadingStatus = 'failure';
      state.error = JSON.stringify(action.payload.error);
    },
    setUserSessionCheckLoadStatusSuccess(
      state,
      action: { payload: { isAuthenticated: boolean }; type: string },
    ) {
      state.loadingStatus = 'success';
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    checkUserSessionAsync() {},
  },
});

const userSession = userSessionSlice.reducer;
const {
  setUserSessionCheckLoadStatusIdle,
  setUserSessionCheckLoadStatusLoading,
  setUserSessionCheckLoadStatusFailure,
  setUserSessionCheckLoadStatusSuccess,
  checkUserSessionAsync,
} = userSessionSlice.actions;

export {
  userSession,
  setUserSessionCheckLoadStatusIdle,
  setUserSessionCheckLoadStatusLoading,
  setUserSessionCheckLoadStatusFailure,
  setUserSessionCheckLoadStatusSuccess,
  checkUserSessionAsync,
};
