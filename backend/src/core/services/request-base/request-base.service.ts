import type { AxiosInstance } from 'axios';
import axios_ from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import type { IGenericRequest } from '.';
import { DEFAULT_HEADERS, LIB_SPECIFIC_OPTIONS } from './request-base.service.const';
import { RequestBuilder } from './request-builder.service';

const getAxiosSocksInstance = (
  socksInternal: string,
  socksAgent = new SocksProxyAgent(socksInternal),
): AxiosInstance => axios_.create({ httpsAgent: socksAgent, httpAgent: socksAgent });

// to avoid creating new axios instance for every request define wrapper
const socksAxiosInstanceWrap = (socks: string) => {
  let socksWrap = socks;
  let axiosInstance = getAxiosSocksInstance(socksWrap);

  return (socksCurrent: string) => {
    if (socksWrap !== socksCurrent) {
      socksWrap = socksCurrent;
      axiosInstance = getAxiosSocksInstance(socksWrap);
    }

    return axiosInstance;
  };
};

// TODO: move default socks address to ENV
const socksAxiosInstance = socksAxiosInstanceWrap('socks://127.0.0.1:1080');

const requestGeneric = ({
  method,
  host,
  path,
  data,
  headers,
  proxy,
  proxyType,
  ...args
}: IGenericRequest) => {
  const options = new RequestBuilder()
    .setUrl({ url: `${host}${path}` })
    .setMethod({ method })
    .setHeaders({ headers: { ...DEFAULT_HEADERS, ...headers } })
    .setBody({ data })
    .setLibSpecificOptions({
      ...LIB_SPECIFIC_OPTIONS,
      ...args,
    });

  let axios: AxiosInstance = axios_;

  if (proxy !== undefined) {
    switch (proxyType) {
      case 'http': {
        if (typeof proxy === 'object') {
          options.setProxy({ proxy, ...args });
        }
        break;
      }
      case 'socks': {
        if (typeof proxy === 'string') {
          axios = socksAxiosInstance(proxy);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return axios(options.getRequest());
};

const Request = {
  get: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'GET', host, path, data, headers, ...args }),
  post: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'POST', host, path, data, headers, ...args }),
  put: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'PUT', host, path, data, headers, ...args }),
  delete: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'DELETE', host, path, data, headers, ...args }),
};

const requestBindedHost = ({ host }: Pick<IGenericRequest, 'host'>) => ({
  get: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.get({ host, path, data, headers, ...args }),
  post: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.post({ host, path, data, headers, ...args }),
  put: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.put({ host, path, data, headers, ...args }),
  delete: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.delete({ host, path, data, headers, ...args }),
});

// handleRequest(bindedHostRequest.get({1,2,3}))
// const handleRequest = (req) => req.catch((res: AxiosError) => handleErrorResponse(res));

export { Request, requestBindedHost };
