type TLoadingStatus = 'idle' | 'loading' | 'success' | 'failure';

type TIsAuthenticated = 'idle' | boolean;

type TUserAuthInitState = {
  isAuthenticated: TIsAuthenticated;
  loadingStatus: TLoadingStatus;
  error: string | undefined;
};

export type { TUserAuthInitState, TIsAuthenticated, TLoadingStatus };
