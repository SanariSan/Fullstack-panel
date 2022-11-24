import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class RegistrationErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, data }: { res: Response; data?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.CONFLICT,
      data,
    });

    this.type = ERESPONSE_TYPE.REGISTER_FAILURE;
    this.title = 'Registration error';
    this.detail = 'Registration failed, try using different credentials';
  }
}

export { RegistrationErrorResponse };
