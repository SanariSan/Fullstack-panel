import type { AxiosError } from 'axios';
import { Request } from '../../../core/services';
import { BadStatusError } from '../../../core/services/error';
import { makeForm, parseResponse } from '../../../helpers/services';

async function sendMultipart() {
  const form = makeForm({ obj: { foo: 1, bar: 2, baz: 3 } });
  const response = await Request.post({
    host: 'https://postman-echo.com',
    path: '/post',
    data: form,
    headers: {
      ...form.getHeaders(),
    },
  }).catch((error: Readonly<unknown>) => {
    // later parse error more carefully
    throw new BadStatusError((error as AxiosError).code ?? '');
  });

  return parseResponse({ response });
}

export { sendMultipart };
