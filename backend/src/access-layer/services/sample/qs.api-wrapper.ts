import type { AxiosError } from 'axios';
import { stringify } from 'node:querystring';
import { Request } from '../../../core/services';
import { BadStatusError } from '../../../core/services/error';
import { parseResponse } from '../../../helpers/services';

async function sendQs() {
  const response = await Request.post({
    host: 'https://postman-echo.com',
    path: '/post',
    data: stringify({ foo: 1, bar: 2, baz: 3 }),
  }).catch((error: Readonly<unknown>) => {
    // later parse error more carefully
    throw new BadStatusError((error as AxiosError).code ?? '');
  });

  return parseResponse({ response });
}

export { sendQs };
