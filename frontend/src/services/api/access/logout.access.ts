import { request } from '../../request-base.services';

export async function logoutUser(abortSignal: AbortSignal) {
  return request({
    url: `http://127.0.0.1:3000/api/v1/access/logout`,
    method: 'DELETE',
    abortSignal,
  });
}
