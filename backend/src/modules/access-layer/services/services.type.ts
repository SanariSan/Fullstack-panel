import type { IGenericRequest } from '../../core/services';

type TBindedMethodRequest = Omit<IGenericRequest, 'method'>;
type TBindedMethodHostRequest = Omit<IGenericRequest, 'method' | 'host'>;

export type { TBindedMethodRequest, TBindedMethodHostRequest };
