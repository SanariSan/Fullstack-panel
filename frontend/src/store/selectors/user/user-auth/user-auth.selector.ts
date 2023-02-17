import type { TRootState } from '../../../redux.store.type';

const userAuthLoadingStatusSelector = (state: TRootState) => state.user.userAuth.loadingStatus;
const userAuthIsAuthenticatedSelector = (state: TRootState) => state.user.userAuth.isAuthenticated;
const userAuthErrorSelector = (state: TRootState) => state.user.userAuth.error;

export { userAuthLoadingStatusSelector, userAuthIsAuthenticatedSelector, userAuthErrorSelector };
