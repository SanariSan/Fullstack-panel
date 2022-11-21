import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class AuthFailureErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, data }: { res: Response; data?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.UNAUTHORIZED,
      data,
    });

    this.type = ERESPONSE_TYPE.AUTH_FAILURE;
    this.title = 'Auth error';
    this.detail = 'Authentication failed, wrong credentials';
  }
}

export { AuthFailureErrorResponse };
