import type { TObjectUnknown } from '../../../../general.type';
import { GenericError } from '../../../error';

class CliPromptError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'CliPromptError';
    this.description = 'Cli prompt module error';
    this.miscellaneous = miscellaneous;
  }
}

export { CliPromptError };
