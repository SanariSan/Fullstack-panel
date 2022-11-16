import type { TRootState } from '../../../redux.store.type';

const userInfoLoginSelector = (state: TRootState) => state.user.userInfo.login;

export { userInfoLoginSelector };
