import { GenericError } from '../../../../core/error';
import type { TObjectUnknown } from '../../../../general.type';

class ExpressError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'ExpressError';
    this.description = `Express generic error`;
    this.miscellaneous = miscellaneous;
  }
}

export { ExpressError };
