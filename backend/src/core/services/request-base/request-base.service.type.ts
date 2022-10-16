import type { AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import type { TObjectAny } from '../../../general.type';

type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequest {
  method?: TRequestMethod;
  url?: string;
  headers?: HeadersInit;
  data?: unknown;
  proxy?: AxiosProxyConfig;
}

interface IGenericRequest {
  method: TRequestMethod;
  host: string;
  path: string;
  data?: unknown;
  headers?: TObjectAny;
  proxyType?: 'socks' | 'http';
  proxy?: string | AxiosProxyConfig;
  args?: AxiosRequestConfig;
}

export type { IRequest, TRequestMethod, IGenericRequest };
