import type { TRootState } from '../../../redux.store.type';

const userAuthLoadingStatusSelector = (state: TRootState) => state.user.userAuth.loadingStatus;
const userAuthIsAuthenticatedSelector = (state: TRootState) => state.user.userAuth.isAuthenticated;

export { userAuthLoadingStatusSelector, userAuthIsAuthenticatedSelector };
