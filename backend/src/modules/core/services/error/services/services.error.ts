import { GenericError } from '../../../error';

class ServicesError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'ServicesError';
    this.description = `Services generic error`;
  }
}

export { ServicesError };
