import path from 'path';

const constructApiUrl = (base: string) => (apiVersion: string) => (urlPath: string) =>
  new URL(path.join(`api`, `${apiVersion}`, `${urlPath}`), base).href;
const getApiUrl = constructApiUrl(process.env.REACT_APP_API_URL)(process.env.REACT_APP_API_VERSION);

const STATIC_ACCESS_ROUTES = {
  REGISTER: '/access/register',
  LOGIN: '/access/login',
  CHANGE_PASSWORD: '/access/change-password',
  LOGOUT: '/access/logout',
  AUTH_STATUS: '/access/auth-status',
};

const ROUTES = {
  ACCESS: {
    REGISTER: getApiUrl(STATIC_ACCESS_ROUTES.REGISTER),
    LOGIN: getApiUrl(STATIC_ACCESS_ROUTES.LOGIN),
    CHANGE_PASSWORD: getApiUrl(STATIC_ACCESS_ROUTES.CHANGE_PASSWORD),
    LOGOUT: getApiUrl(STATIC_ACCESS_ROUTES.LOGOUT),
    AUTH_STATUS: getApiUrl(STATIC_ACCESS_ROUTES.AUTH_STATUS),
  },
};

export { STATIC_ACCESS_ROUTES, ROUTES };
