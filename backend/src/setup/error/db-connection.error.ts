import { GenericError } from '../../core/error';
import type { TObjectUnknown } from '../../general.type';

class DbConnectionError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'DbConnectionError';
    this.description = 'Initial db connection error';
    this.miscellaneous = miscellaneous;
  }
}

export { DbConnectionError };
