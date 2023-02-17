import type { TRootState } from '../../../redux.store.type';

const userInfoUsernameSelector = (state: TRootState) => state.user.userInfo.username;

export { userInfoUsernameSelector };
