import type { IAccessLoginFields } from '../../../data-models/outgoing';
import { request } from '../../request-base.services';

export async function loginUser({
  body,
  abortSignal,
}: {
  body: IAccessLoginFields;
  abortSignal: AbortSignal;
}) {
  return request({
    url: `http://127.0.0.1:3000/api/v1/access/login`,
    method: 'POST',
    body: JSON.stringify(body),
    abortSignal,
  });
}
