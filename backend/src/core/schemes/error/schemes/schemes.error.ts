import type { TObjectUnknown } from '../../../../general.type';
import { GenericError } from '../../../error';

class SchemesError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'SchemesError';
    this.description = `Schemes generic error`;
    this.miscellaneous = miscellaneous;
  }
}

export { SchemesError };
