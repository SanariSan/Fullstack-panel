import type { Request } from 'express';
import type { TObjectUnknown } from '../../general.type';

type TRequestNarrowed = Omit<Request, 'body'> & {
  body?: TObjectUnknown | string;
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

// TODO: change TObjectUnknown to typed object, when token prm format is stable
type TRequestTokenPayload = TRequestNarrowed & {
  accessTokenPayloadPrm: TObjectUnknown;
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
