import type { Response } from 'express';
import type { IError } from '../../../../core/error';

function handleExpress(e: Readonly<IError>, res: Response) {
  return;
}

export { handleExpress };
