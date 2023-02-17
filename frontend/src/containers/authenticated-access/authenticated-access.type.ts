import type { ReactNode } from 'react';

type TAuthRoute = {
  children: ReactNode;
  mustBeAuthenticated: boolean;
  redirectLocation: string;
};

export type { TAuthRoute };
