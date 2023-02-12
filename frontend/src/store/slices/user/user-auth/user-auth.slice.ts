import { createSlice } from '@reduxjs/toolkit';
import type { IAccessLoginFields, IAccessRegisterFields } from '../../../../data-models/outgoing';
import { USER_AUTH_INIT_STATE } from './user-auth.slice.const';
import type { TIsAuthenticated, TLoadingStatus } from './user-auth.slice.type';

/* eslint-disable no-param-reassign */

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: USER_AUTH_INIT_STATE,
  reducers: {
    setUserIsAuthenticated(state, action: { payload: { status: TIsAuthenticated }; type: string }) {
      state.isAuthenticated = action.payload.status;
    },
    setUserAuthLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; error?: unknown }; type: string },
    ) {
      state.loadingStatus = action.payload.status;

      if (action.payload.status === 'failure' && action.payload.error !== undefined) {
        state.error = JSON.stringify(action.payload.error);
      }
    },
    checkUserSessionAsync() {
      // saga
    },
    registerUserAsync(state, action: { payload: IAccessRegisterFields; type: string }) {
      // saga
    },
    loginUserAsync(state, action: { payload: IAccessLoginFields; type: string }) {
      // saga
    },
    logoutUserAsync() {
      // saga
    },
  },
});

const userAuth = userAuthSlice.reducer;
const {
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserSessionAsync,
  registerUserAsync,
  loginUserAsync,
  logoutUserAsync,
} = userAuthSlice.actions;

export {
  userAuth,
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserSessionAsync,
  registerUserAsync,
  loginUserAsync,
  logoutUserAsync,
};
