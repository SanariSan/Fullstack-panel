import { GenericError } from '../generic';

class ValueTypeError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'ValueTypeError';
    this.description = 'wrong value type';
    this.miscellaneous = miscellaneous;
  }
}

export { ValueTypeError };
