import { GenericError } from '../../modules/core/error';

class DbConnectionError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'DbConnectionError';
    this.description = 'Initial db connection error';
    this.miscellaneous = miscellaneous;
  }
}

export { DbConnectionError };
