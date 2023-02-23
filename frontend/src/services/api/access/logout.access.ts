import { AccessLogoutIncomingFailureDM, AccessLogoutIncomingSuccessDM } from '../data-models';
import { request } from '../../request-base.services';
import { isExpectedFailureResponse, isExpectedSuccessResponse } from '../response-classify.api';
import { ROUTES } from '../routes.api';

export async function logoutUser({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: ROUTES.ACCESS.LOGOUT,
      method: 'DELETE',
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (isExpectedSuccessResponse(response, parsedJsonResponse)) {
      return new AccessLogoutIncomingSuccessDM(parsedJsonResponse);
    }
    if (isExpectedFailureResponse(response, parsedJsonResponse)) {
      return new AccessLogoutIncomingFailureDM(parsedJsonResponse);
    }

    const text = (await response.clone().text()).slice(200);
    console.error(text);
    throw new Error('Internal error');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
