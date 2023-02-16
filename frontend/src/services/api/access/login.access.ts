import type { IAccessLoginOutgoingDM } from '../../../data-models/login';
import {
  AccessLoginIncomingFailureDM,
  AccessLoginIncomingSuccessDM,
} from '../../../data-models/login';
import { request } from '../../request-base.services';
import {
  isExpectedFailureResponse,
  isExpectedSuccessResponse,
} from '../../response-handle.services';

export async function loginUser({
  dm,
  abortSignal,
}: {
  dm: IAccessLoginOutgoingDM;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: `http://127.0.0.1:3000/api/v1/access/login`,
      method: 'POST',
      body: JSON.stringify(dm.getFields()),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (isExpectedSuccessResponse(response, parsedJsonResponse)) {
      return new AccessLoginIncomingSuccessDM(parsedJsonResponse);
    }
    if (isExpectedFailureResponse(response, parsedJsonResponse)) {
      return new AccessLoginIncomingFailureDM(parsedJsonResponse);
    }

    const text = (await response.clone().text()).slice(200);
    console.error(text);
    throw new Error('Internal error');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
