import fetch from 'isomorphic-fetch';
import { sleep } from '../helpers/util';
import { DEFAULT_FETCH_HEADERS, DEFAULT_FETCH_OPTIONS } from './services.const';
import type { IRequestOptions } from './services.type';

// if externally signalled - stop ongoing request through local abort controller
// wrap for sub/unsub cb
const externalAbortControllerCbWrapper = (localAbortController: AbortController) => () => {
  localAbortController.abort();
};

const setupExternalAbortControllerSignalListener = ({
  externalAbortControllerCb,
  externalAbortController,
  abortSignal,
}: {
  externalAbortControllerCb: () => void;
  externalAbortController: AbortController;
  abortSignal?: AbortSignal;
}) => {
  externalAbortController.signal.addEventListener('abort', externalAbortControllerCb);

  // if raw signal passed make it also be able to trigger localAbortController
  if (abortSignal) {
    abortSignal.addEventListener('abort', externalAbortControllerCb);
  }

  // if abort happened while was not listening - dispatch missed event
  if (externalAbortController.signal.aborted || (abortSignal && abortSignal.aborted)) {
    externalAbortController.signal.dispatchEvent(new Event('abort'));
  }
};

const cleanupExternalAbortControllerSignalListener = ({
  externalAbortControllerCb,
  externalAbortController,
  abortSignal,
}: {
  externalAbortControllerCb: () => void;
  externalAbortController: AbortController;
  abortSignal?: AbortSignal;
}) => {
  externalAbortController.signal.removeEventListener('abort', externalAbortControllerCb);

  if (abortSignal) {
    abortSignal.removeEventListener('abort', externalAbortControllerCb);
  }
};

async function request({
  url,
  method,
  headers,
  body,
  fetchOtions,
  timeoutMS = 10_000,
  attemptDelayMS = 500,
  attemptDelayGrowthMS = 500,
  maxAttempts = 1,
  // for manually interrupting from outside
  abortController: externalAbortController = new AbortController(),
  // for compatibility with thunk/any module providing raw signal
  abortSignal,
}: IRequestOptions) {
  const requestInternal = (localAbortController: AbortController) =>
    fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOtions,
      headers: {
        ...DEFAULT_FETCH_HEADERS,
        ...headers,
      },
      signal: localAbortController.signal,
      method,
      body,
    });

  let errorReturn: Error | undefined;
  let currentAttempt = 0;
  while (currentAttempt < maxAttempts) {
    const localAbortController = new AbortController();
    const externalAbortControllerCb = externalAbortControllerCbWrapper(localAbortController);

    setupExternalAbortControllerSignalListener({
      externalAbortControllerCb,
      externalAbortController,
      abortSignal,
    });

    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      localAbortController.abort();
    }, timeoutMS);

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    const response = (await requestInternal(localAbortController).catch((error: Error) => {
      errorReturn = error;
    })) as Response | undefined;

    clearTimeout(timeoutId);

    cleanupExternalAbortControllerSignalListener({
      externalAbortControllerCb,
      externalAbortController,
      abortSignal,
    });

    // exit point with response
    if (response !== undefined) {
      console.dir({ url: response.url, status: response.status, headers: response.headers });
      return response;
    }

    // check if external signal was called at this point to not sleep when just need to exit
    if (externalAbortController.signal.aborted || (abortSignal && abortSignal.aborted)) {
      errorReturn = new Error('Request externally aborted');
      break;
    }

    await sleep(attemptDelayMS + currentAttempt * attemptDelayGrowthMS);

    currentAttempt += 1;
  }

  throw errorReturn as Error;
}

export { request };
