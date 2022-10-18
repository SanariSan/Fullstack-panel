import { GenericError } from '../../core/error';
import type { TObjectUnknown } from '../../general.type';

class NoEnvValueError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'NoEnvValueError';
    this.description = '.env value related error';
    this.miscellaneous = Object.assign(process.env, miscellaneous);
  }
}

export { NoEnvValueError };
