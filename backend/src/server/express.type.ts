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

// type TRequestValidatedTokenAccess = TRequestNarrowed & {
//   headers: {
//     authorization: string;
//   };
// };
// type TRequestValidatedTokenRefresh = TRequestNarrowed & {
//   body: {
//     refreshToken: string;
//   };
// };

// TODO: change Record<string, unknown> to typed object, when token prm format is stable
// type TRequestTokenPayload = TRequestNarrowed & {
//   accessTokenPayloadPrm: Record<string, unknown>;
// };

type TRequest =
  | TRequestNarrowed
  | TRequestValidatedCredentials
  | TRequestValidatedCredentialsChange;
// | TRequestValidatedTokenAccess
// | TRequestValidatedTokenRefresh
// | TRequestTokenPayload;

export type {
  TRequestNarrowed,
  TRequestValidatedCredentials,
  TRequestValidatedCredentialsChange,
  TRequest,
  // TRequestValidatedTokenAccess,
  // TRequestValidatedTokenRefresh,
  // TRequestTokenPayload,
};
