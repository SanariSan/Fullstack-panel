import type { AxiosError, AxiosResponse } from 'axios';
import type { IParsedResponse } from '.';
import { publishErrorUnexpected } from '../../access-layer/events/pubsub';
import type { TObjectAny } from '../../general.type';
import { ELOG_LEVEL } from '../../general.type';

function parseResponse({ response }: { readonly response: unknown }): IParsedResponse {
  const castedResponse = response as AxiosResponse;
  return {
    request: {
      // data: response.request.data,
      request: castedResponse.request as TObjectAny,
      /* eslint-disable-next-line no-underscore-dangle */
      headers: (castedResponse.request as TObjectAny)._header as string,
      /* eslint-enable-next-line no-underscore-dangle */
    },
    response: {
      response: castedResponse,
      data: castedResponse.data,
      headers: castedResponse.headers as TObjectAny,
    },
  };
}

function handleErrorResponse(response: Readonly<unknown>): Promise<AxiosResponse> {
  const castedResponse = response as AxiosError;

  // @ts-expect-error Will rework axios laster and fix this
  publishErrorUnexpected(ELOG_LEVEL.WARN, castedResponse.message);

  return Promise.reject(castedResponse.response);
}

export { handleErrorResponse, parseResponse };
