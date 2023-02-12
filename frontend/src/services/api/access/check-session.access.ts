import { request } from '../../request-base.services';

export async function checkUserSession(abortSignal: AbortSignal) {
  return request({
    url: `http://127.0.0.1:3000/api/v1/access/login`,
    abortSignal,
  });
}
