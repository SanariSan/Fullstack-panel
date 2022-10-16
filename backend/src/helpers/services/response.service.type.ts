import type { AxiosResponse } from 'axios';
import type { TObjectAny } from '../../general.type';

interface IParsedResponse {
  request: {
    // data: ;
    request: TObjectAny;
    headers: string;
  };
  response: {
    response: AxiosResponse;
    data?: string | TObjectAny;
    headers: TObjectAny;
  };
}

export type { IParsedResponse };
