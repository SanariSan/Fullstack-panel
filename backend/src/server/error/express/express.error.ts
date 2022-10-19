import { GenericError } from '../../../modules/core/error';

class ExpressError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'ExpressError';
    this.description = `Express generic error`;
    this.miscellaneous = miscellaneous;
  }
}

export { ExpressError };
