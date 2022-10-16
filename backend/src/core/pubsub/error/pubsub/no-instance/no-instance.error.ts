import type { TObjectUnknown } from '../../../../../general.type';
import { PubSubError } from '../pubsub.error';

class NoInstanceError extends PubSubError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'NoInstanceError';
    this.description = `Attempt to get channels from emitter, that is not prepared for that`;
    this.miscellaneous = miscellaneous;
  }
}

export { NoInstanceError };
