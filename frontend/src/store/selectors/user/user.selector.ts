import type { TRootState } from '../../redux.store.type';

const userAuthSelector = (state: TRootState) => state.user.isAuthenticated;
const userLoginSelector = (state: TRootState) => state.user.login;
const userLoadingSelector = (state: TRootState) => state.user.loadingStatus;

export { userAuthSelector, userLoginSelector, userLoadingSelector };