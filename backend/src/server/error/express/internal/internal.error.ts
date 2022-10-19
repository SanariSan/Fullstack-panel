import { ExpressError } from '../express.error';

class InternalError extends ExpressError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'InternalError';
    this.description = `Internal server error, probably edge case hit`;
  }
}

export { InternalError };
