import type { TObjectUnknown } from '../../../../general.type';
import { GenericError } from '../../../error';

class JWTError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'JWTError';
    this.description = `JWT generic error`;
    this.miscellaneous = miscellaneous;
  }
}

export { JWTError };
