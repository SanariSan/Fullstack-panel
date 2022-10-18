import type { TObjectUnknown } from '../../../general.type';
import { GenericError } from '../generic';

class ValueTypeError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'ValueTypeError';
    this.description = 'wrong value type';
    this.miscellaneous = miscellaneous;
  }
}

export { ValueTypeError };
