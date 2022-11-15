type TLoadinStatus = 'idle' | 'loading' | 'success' | 'failure';

type TUserAuthInitState = {
  loadingStatus: TLoadinStatus;
  error: string | undefined;
};

export type { TUserAuthInitState };
