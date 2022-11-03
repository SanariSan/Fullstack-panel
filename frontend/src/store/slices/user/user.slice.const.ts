import type { TUserInitState } from './user.slice.type';

const USER_INIT_STATE: TUserInitState = {
  isAuthenticated: false,
  login: '',
  status: 'idle',
  error: undefined,
};

export { USER_INIT_STATE };
