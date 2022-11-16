type TLoadinStatus = 'idle' | 'loading' | 'success' | 'failure';

type TUserSessionInitState = {
  loadingStatus: TLoadinStatus;
  error: string | undefined;
  isAuthenticated: 'idle' | boolean;
};

export type { TUserSessionInitState };
