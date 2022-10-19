import type { Request } from 'express';

type TRequestNarrowed = Omit<Request, 'body'> & {
  body?: Record<string, unknown> | string;
};

type TRequestValidatedTokenAccess = TRequestNarrowed & {
  headers: {
    authorization: string;
  };
};
type TRequestValidatedTokenRefresh = TRequestNarrowed & {
  body: {
    refreshToken: string;
  };
};

type TRequestValidatedCredentials = TRequestNarrowed & {
  body: {
    email: string;
    password: string;
  };
};
type TRequestValidatedCredentialsChange = TRequestNarrowed & {
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

// TODO: change Record<string, unknown> to typed object, when token prm format is stable
type TRequestTokenPayload = TRequestNarrowed & {
  accessTokenPayloadPrm: Record<string, unknown>;
};

type TRequest =
  | TRequestNarrowed
  | TRequestValidatedTokenAccess
  | TRequestValidatedTokenRefresh
  | TRequestValidatedCredentials
  | TRequestValidatedCredentialsChange
  | TRequestTokenPayload;

export type {
  TRequestNarrowed,
  TRequestTokenPayload,
  TRequestValidatedTokenAccess,
  TRequestValidatedTokenRefresh,
  TRequestValidatedCredentials,
  TRequestValidatedCredentialsChange,
  TRequest,
};
