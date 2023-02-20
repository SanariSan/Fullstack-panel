import type { IIncomingFailureFields, IIncomingSuccessFields } from './data-models';

function isNotEmptyObject(input: unknown): input is { [key: string]: unknown } {
  return (
    typeof input === 'object' &&
    !Array.isArray(input) &&
    input !== null &&
    Object.keys(input).length > 0
  );
}

function isExpectedSuccessResponse(
  response: Response,
  parsedJsonResponse: unknown,
): parsedJsonResponse is IIncomingSuccessFields {
  return (
    isNotEmptyObject(parsedJsonResponse) &&
    response.status > 100 &&
    response.status < 400 &&
    parsedJsonResponse.data !== undefined
  );
}

function isExpectedFailureResponse(
  response: Response,
  parsedJsonResponse: unknown,
): parsedJsonResponse is IIncomingFailureFields {
  return (
    isNotEmptyObject(parsedJsonResponse) &&
    response.status > 400 &&
    parsedJsonResponse.type !== undefined &&
    parsedJsonResponse.title !== undefined &&
    parsedJsonResponse.detail !== undefined &&
    parsedJsonResponse.miscellaneous !== undefined
  );
}

export { isNotEmptyObject, isExpectedFailureResponse, isExpectedSuccessResponse };
