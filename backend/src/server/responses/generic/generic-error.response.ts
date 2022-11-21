import type { Response } from 'express';
import { ERESPONSE_TYPE } from '../response.const';
import { GenericApiResponse } from './generic.response';

class GenericErrorResponse extends GenericApiResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  protected data: Record<string, unknown>;

  constructor({
    res,
    status,
    data,
  }: {
    res: Response;
    status: number;
    data?: Record<string, unknown>;
  }) {
    super({ res, status });

    this.type = ERESPONSE_TYPE.FAILURE;
    this.title = 'Generic error';
    this.detail = 'No case-specific description provided';
    this.data = data ?? {};

    // if (process.env.NODE_ENV === 'development') {
    this.data.stack = new Error('Traceback').stack;
    // }
  }

  // reimplement
  protected compose() {
    this.body = {
      type: this.type,
      title: this.title,
      detail: this.detail,
      data: this.data,
    };

    return this;
  }
}

export { GenericErrorResponse };
