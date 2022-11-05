import type { TUserInitState } from './user.slice.type';

const USER_INIT_STATE: TUserInitState = {
  isAuthenticated: false,
  login: '',
  loadingStatus: 'idle',
  error: undefined,
};

export { USER_INIT_STATE };
