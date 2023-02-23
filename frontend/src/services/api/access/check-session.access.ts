import { request } from '../../request-base.services';
import {
  AccessCheckSessionIncomingFailureDM,
  AccessCheckSessionIncomingSuccessDM,
} from '../data-models';
import { isExpectedFailureResponse, isExpectedSuccessResponse } from '../response-classify.api';
import { ROUTES } from '../routes.api';

export async function checkUserAuthStatus({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: ROUTES.ACCESS.AUTH_STATUS,
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    console.dir(parsedJsonResponse);

    if (isExpectedSuccessResponse(response, parsedJsonResponse)) {
      return new AccessCheckSessionIncomingSuccessDM(parsedJsonResponse);
    }
    if (isExpectedFailureResponse(response, parsedJsonResponse)) {
      return new AccessCheckSessionIncomingFailureDM(parsedJsonResponse);
    }

    const text = (await response.clone().text()).slice(200);
    console.error(text);
    throw new Error('Internal error');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
