import { AccessLogoutIncomingFailureDM, AccessLogoutIncomingSuccessDM } from '../data-models';
import { request } from '../../request-base.services';
import { isExpectedFailureResponse, isExpectedSuccessResponse } from '../response-classify.api';

export async function logoutUser({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: `http://127.0.0.1:3000/api/v1/access/logout`,
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
