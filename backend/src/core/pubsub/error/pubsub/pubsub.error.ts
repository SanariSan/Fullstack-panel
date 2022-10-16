import type { TObjectUnknown } from '../../../../general.type';
import { GenericError } from '../../../error';

class PubSubError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'PubSubError';
    this.description = 'PubSub related error';
    this.miscellaneous = miscellaneous;
  }
}

export { PubSubError };
