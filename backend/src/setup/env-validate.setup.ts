import { ValueTypeError } from '../modules/core/error';
import { NoEnvValueError } from './error';

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
export function setupValidateEnv() {
  if (process.env.NODE_ENV === undefined) {
    throw new NoEnvValueError('NODE_ENV');
  }
  if (process.env.BASE_URL === undefined) {
    throw new NoEnvValueError('BASE_URL');
  }
  if (process.env.API_VERSION === undefined) {
    throw new NoEnvValueError('API_VERSION');
  }
  // if (process.env.JWT_SECRET === undefined) {
  //   throw new NoEnvValueError('JWT_SECRET');
  // }
  // if (process.env.JWT_EXP === undefined) {
  //   throw new NoEnvValueError('JWT_EXP');
  // }
  // if (Number.isNaN(Number(process.env.JWT_EXP))) {
  //   throw new ValueTypeError('JWT_EXP', {
  //     expectedValue: 'number',
  //     actualValue: process.env.JWT_EXP,
  //   });
  // }
  if (process.env.COOKIE_SECRET === undefined) {
    throw new NoEnvValueError('COOKIE_SECRET');
  }
  if (process.env.PORT === undefined) {
    throw new NoEnvValueError('PORT');
  }
  if (Number.isNaN(Number(process.env.PORT))) {
    throw new ValueTypeError('PORT', {
      expectedValue: 'number',
      actualValue: process.env.PORT,
    });
  }
  if (process.env.DEFAULT_SOCKS_URL === undefined) {
    throw new NoEnvValueError('DEFAULT_SOCKS_URL');
  }
  if (!/^socks:\/{2}(?:\d{1,3}.){3}\d{1,3}:\d{1,5}$/.test(process.env.DEFAULT_SOCKS_URL)) {
    throw new ValueTypeError('DEFAULT_SOCKS_URL', {
      expectedValue: 'socks://xxx.yyy.xxx.yyy:xxxxx',
      actualValue: process.env.DEFAULT_SOCKS_URL,
    });
  }
  if (process.env.CORS_URL_PROD === undefined) {
    throw new NoEnvValueError('CORS_URL_PROD');
  }
  if (process.env.BUILD_PATH === undefined) {
    throw new NoEnvValueError('BUILD_PATH');
  }
  if (process.env.CORS_URL_DEV === undefined) {
    throw new NoEnvValueError('CORS_URL_DEV');
  }
  if (process.env.DB_HOST === undefined) {
    throw new NoEnvValueError('DB_HOST');
  }
  if (process.env.DB_PORT === undefined) {
    throw new NoEnvValueError('DB_PORT');
  }
  if (Number.isNaN(Number(process.env.DB_PORT))) {
    throw new ValueTypeError('DB_PORT', {
      expectedValue: 'number',
      actualValue: process.env.DB_PORT,
    });
  }
  if (process.env.DB_DATABASE_NAME === undefined) {
    throw new NoEnvValueError('DB_DATABASE_NAME');
  }
  if (process.env.DB_USER === undefined) {
    throw new NoEnvValueError('DB_USER');
  }
  if (process.env.DB_PASSWORD === undefined) {
    throw new NoEnvValueError('DB_PASSWORD');
  }
}
