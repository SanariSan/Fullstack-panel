type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  url: RequestInfo | string;
  method?: TRequestMethod;
  headers?: HeadersInit;
  body?: BodyInit | null | undefined;
  fetchOtions?: RequestInit & { method: TRequestMethod };
  timeoutMS?: number;
  attemptDelayMS?: number;
  attemptDelayGrowthMS?: number;
  maxAttempts?: number;
  abortController?: AbortController;
  abortSignal?: AbortSignal;
}

export type { TRequestMethod, IRequestOptions };
