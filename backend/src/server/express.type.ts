import type { Request } from 'express';
import type { Session } from 'express-session';

type TSessionCustomFields = {
  userId?: number;
  email?: string;
  username?: string;
  isAuthenticated?: boolean;
};

type TRequestNarrowed = Omit<Request, 'body'> & {
  body?: Record<string, unknown> | string;
} & {
  session: Session & {
    user?: TSessionCustomFields;
  };
};

type TRequestValidatedLogin = TRequestNarrowed & {
  body: {
    username: string;
    password: string;
  };
};

type TRequestValidatedRegister = TRequestNarrowed & {
  body: {
    email: string;
    username: string;
    password: string;
  };
};

type TRequestValidatedChange = TRequestNarrowed & {
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

type TRequest =
  | TRequestNarrowed
  | TRequestValidatedLogin
  | TRequestValidatedRegister
  | TRequestValidatedChange;

export type {
  TRequestNarrowed,
  TRequestValidatedLogin,
  TRequestValidatedRegister,
  TRequestValidatedChange,
  TRequest,
};
