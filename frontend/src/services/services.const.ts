const DEFAULT_FETCH_HEADERS = {
  Connection: 'keep-alive',
};

const DEFAULT_FETCH_OPTIONS: {
  method: string;
  redirect?: 'manual' | 'error' | 'follow';
} = {
  method: 'GET',
  redirect: 'manual',
};

export { DEFAULT_FETCH_HEADERS, DEFAULT_FETCH_OPTIONS };
