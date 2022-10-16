import type { TApiVersion } from './logic/express/routers';

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
