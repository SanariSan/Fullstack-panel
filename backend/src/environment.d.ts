import type { TApiVersion } from './server/routers';

// no undefined options because running validate .env values fn on app launch
/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // general
      NODE_ENV: 'production' | 'development';
      BASE_URL: string;
      API_VERSION: TApiVersion;
      JWT_SECRET: string;
      JWT_EXP: string;
      PORT: string;
      DEFAULT_SOCKS_URL: string;
      // db
      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      // production
      CORS_URL_PROD: string;
      BUILD_PATH: string;
      // development
      CORS_URL_DEV: string;
    }
  }
}
/* eslint-enable @typescript-eslint/naming-convention */

export {};
