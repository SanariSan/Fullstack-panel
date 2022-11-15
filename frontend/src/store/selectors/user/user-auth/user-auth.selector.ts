import type { TRootState } from '../../../redux.store.type';

const userAuthLoadingStatusSelector = (state: TRootState) => state.user.userAuth.loadingStatus;

export { userAuthLoadingStatusSelector };
