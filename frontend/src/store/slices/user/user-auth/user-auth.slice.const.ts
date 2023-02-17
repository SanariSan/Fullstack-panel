import type { TUserAuthInitState } from './user-auth.slice.type';

const USER_AUTH_INIT_STATE: TUserAuthInitState = {
  isAuthenticated: 'idle',
  loadingStatus: 'idle',
  error: undefined,
};

export { USER_AUTH_INIT_STATE };
