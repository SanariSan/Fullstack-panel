type TUserLoadinStatus = 'idle' | 'loading' | 'success' | 'failure';

type TUserInitState = {
  isAuthenticated: boolean;
  login: string;
  loadingStatus: TUserLoadinStatus;
  error: string | undefined;
};

type TUserInitialStateThunk = {
  user: TUserInitState;
};

export type { TUserLoadinStatus, TUserInitState, TUserInitialStateThunk };
