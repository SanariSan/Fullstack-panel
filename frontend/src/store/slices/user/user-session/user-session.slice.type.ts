type TLoadinStatus = 'idle' | 'loading' | 'success' | 'failure';

type TUserSessionInitState = {
  loadingStatus: TLoadinStatus;
  error: string | undefined;
  isAuthenticated: boolean;
};

export type { TUserSessionInitState };
