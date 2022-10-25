const DEFAULT_FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:83.0) Gecko/20100101 Firefox/83.0',
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
