import { publishError } from '../access-layer/events/pubsub';
import { sendJson, sendMultipart, sendQs } from '../access-layer/services/sample';
import type { GenericError } from '../core/error';
import { ELOG_LEVEL } from '../general.type';

async function exampleRequests() {
  const respJson = await sendJson().catch((error) => {
    publishError(ELOG_LEVEL.WARN, error as GenericError);
  });
  const { request: jsonRequest, response: jsonResponse } = respJson || {};

  const respQs = await sendQs().catch((error) => {
    publishError(ELOG_LEVEL.WARN, error as GenericError);
  });
  const { response: qsResponse } = respQs || {};

  const respMultipart = await sendMultipart().catch((error) => {
    publishError(ELOG_LEVEL.WARN, error as GenericError);
  });
  const { response: multipartResponse } = respMultipart || {};

  console.dir(
    {
      data: jsonResponse?.data,
      headersReq: jsonRequest?.headers,
      headersResp: jsonResponse?.headers,
    },
    { depth: 10, colors: true },
  );
  console.dir({ data: qsResponse?.data }, { depth: 10, colors: true });
  console.dir({ data: multipartResponse?.data }, { depth: 10, colors: true });
}

export { exampleRequests };
