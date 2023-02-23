/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // general
      NODE_ENV: 'production' | 'development';
      // local react development runtime port
      PORT: string;
      // api
      REACT_APP_API_VERSION: 'v1' | 'v2';
      REACT_APP_API_URL: string;
    }
  }
}
/* eslint-enable @typescript-eslint/naming-convention */

export {};
