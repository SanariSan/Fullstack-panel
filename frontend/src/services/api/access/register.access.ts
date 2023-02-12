import type { IAccessRegisterFields } from '../../../data-models/outgoing';
import { request } from '../../request-base.services';

export async function registerUser({
  body,
  abortSignal,
}: {
  body: IAccessRegisterFields;
  abortSignal: AbortSignal;
}) {
  return request({
    url: `http://127.0.0.1:3000/api/v1/access/register`,
    method: 'POST',
    body: JSON.stringify(body),
    abortSignal,
  });
}
