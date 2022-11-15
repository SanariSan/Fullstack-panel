import type { TUserAuthInitState } from './user-auth.slice.type';

const USER_AUTH_INIT_STATE: TUserAuthInitState = {
  loadingStatus: 'idle',
  error: undefined,
};

export { USER_AUTH_INIT_STATE };
