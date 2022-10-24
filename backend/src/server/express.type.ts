import type { Request } from 'express';
import type { Session } from 'express-session';

type TSessionCustomFields = {
  userId?: number;
  login?: string;
  isAuthenticated?: boolean;
};

type TRequestNarrowed = Omit<Request, 'body'> & {
  body?: Record<string, unknown> | string;
} & {
  session: Session & {
    user?: TSessionCustomFields;
  };
};

type TRequestValidatedCredentials = TRequestNarrowed & {
  body: {
    login: string;
    password: string;
  };
};
type TRequestValidatedCredentialsChange = TRequestNarrowed & {
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

type TRequest =
  | TRequestNarrowed
  | TRequestValidatedCredentials
  | TRequestValidatedCredentialsChange;

export type {
  TRequestNarrowed,
  TRequestValidatedCredentials,
  TRequestValidatedCredentialsChange,
  TRequest,
};
