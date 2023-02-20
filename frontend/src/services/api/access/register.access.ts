import { request } from '../../request-base.services';
import type { IAccessRegisterOutgoingDM } from '../data-models';
import { AccessRegisterIncomingFailureDM, AccessRegisterIncomingSuccessDM } from '../data-models';
import { isExpectedFailureResponse, isExpectedSuccessResponse } from '../response-classify.api';

export async function registerUser({
  dm,
  abortSignal,
}: {
  dm: IAccessRegisterOutgoingDM;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: `http://127.0.0.1:3000/api/v1/access/register`,
      method: 'POST',
      body: JSON.stringify(dm.getFields()),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (isExpectedSuccessResponse(response, parsedJsonResponse)) {
      return new AccessRegisterIncomingSuccessDM(parsedJsonResponse);
    }
    if (isExpectedFailureResponse(response, parsedJsonResponse)) {
      return new AccessRegisterIncomingFailureDM(parsedJsonResponse);
    }

    // here can report to monitoring service or smth, then throw
    const text = (await response.clone().text()).slice(200);
    console.error(text);
    throw new Error('Internal error');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
