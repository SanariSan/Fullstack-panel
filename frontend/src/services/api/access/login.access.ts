import { request } from '../../request-base.services';
import { isExpectedFailureResponse, isExpectedSuccessResponse } from '../response-classify.api';
import type { IAccessLoginOutgoingDM } from '../data-models';
import { AccessLoginIncomingFailureDM, AccessLoginIncomingSuccessDM } from '../data-models';
import { ROUTES } from '../routes.api';

export async function loginUser({
  dm,
  abortSignal,
}: {
  dm: IAccessLoginOutgoingDM;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: ROUTES.ACCESS.LOGIN,
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
