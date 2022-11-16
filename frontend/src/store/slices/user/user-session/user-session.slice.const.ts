import type { TUserSessionInitState } from './user-session.slice.type';

const USER_SESSION_INIT_STATE: TUserSessionInitState = {
  loadingStatus: 'idle',
  error: undefined,
  isAuthenticated: 'idle',
};

export { USER_SESSION_INIT_STATE };
