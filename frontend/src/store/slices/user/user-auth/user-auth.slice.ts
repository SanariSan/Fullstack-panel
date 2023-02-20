import { createSlice } from '@reduxjs/toolkit';
import type { IAccessLoginOutgoingDM, IAccessRegisterOutgoingDM } from '../../../../services/api';
import { USER_AUTH_INIT_STATE } from './user-auth.slice.const';
import type { TIsAuthenticated, TLoadingStatus } from './user-auth.slice.type';

/* eslint-disable no-param-reassign */

// example of action creator for saga if decide to move those empty ones
// const registerUserAsync = (payload: IAccessRegisterOutgoingDM) => ({
//   type: 'userAuth/registerUserAsync',
//   payload,
// });

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
    // sagas
    checkUserAuthStatusAsync() {},
    registerUserAsync(state, action: { payload: IAccessRegisterOutgoingDM; type: string }) {},
    loginUserAsync(state, action: { payload: IAccessLoginOutgoingDM; type: string }) {},
    logoutUserAsync() {},
  },
});

const userAuth = userAuthSlice.reducer;
const {
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserAuthStatusAsync,
  registerUserAsync,
  loginUserAsync,
  logoutUserAsync,
} = userAuthSlice.actions;

export {
  userAuth,
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserAuthStatusAsync,
  registerUserAsync,
  loginUserAsync,
  logoutUserAsync,
};
