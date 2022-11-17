import { createSlice } from '@reduxjs/toolkit';
import { USER_INFO_INIT_STATE } from './user-info.slice.const';

/* eslint-disable no-param-reassign */

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: USER_INFO_INIT_STATE,
  reducers: {
    setUserInfo(state, action: { payload: { login?: string }; type: string }) {
      state.login = action.payload.login ?? '';
    },
  },
});

const userInfo = userInfoSlice.reducer;
const { setUserInfo } = userInfoSlice.actions;

export { userInfo, setUserInfo };
