type TUserInitState = {
  isAuthenticated: boolean;
  login: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

type TUserInitialStateThunk = {
  user: TUserInitState;
};

export type { TUserInitState, TUserInitialStateThunk };
