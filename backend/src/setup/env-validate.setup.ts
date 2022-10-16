import { GenericError } from '../core/error';

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
export function setupValidateEnv() {
  if (process.env.NODE_ENV === undefined) {
    throw new GenericError('No env value set: NODE_ENV');
  }
  if (process.env.BASE_URL === undefined) {
    throw new GenericError('No env value set: BASE_URL');
  }
  if (process.env.API_VERSION === undefined) {
    throw new GenericError('No env value set: API_VERSION');
  }
  if (process.env.JWT_SECRET === undefined) {
    throw new GenericError('No env value set: JWT_SECRET');
  }
  if (process.env.JWT_EXP === undefined) {
    throw new GenericError('No env value set: JWT_EXP');
  }
  if (process.env.PORT === undefined) {
    throw new GenericError('No env value set: PORT');
  }
  if (process.env.CORS_URL_PROD === undefined) {
    throw new GenericError('No env value set: CORS_URL_PROD');
  }
  if (process.env.BUILD_PATH === undefined) {
    throw new GenericError('No env value set: BUILD_PATH');
  }
  if (process.env.CORS_URL_DEV === undefined) {
    throw new GenericError('No env value set: CORS_URL_DEV');
  }
}
