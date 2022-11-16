import type { TRootState } from '../../../redux.store.type';

const userSessionLoadingStatusSelector = (state: TRootState) =>
  state.user.userSession.loadingStatus;
const userSessionIsAuthinticatedSelector = (state: TRootState) =>
  state.user.userSession.isAuthenticated;

export { userSessionLoadingStatusSelector, userSessionIsAuthinticatedSelector };
