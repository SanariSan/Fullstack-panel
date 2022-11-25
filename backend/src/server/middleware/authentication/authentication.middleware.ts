import type { NextFunction, Response } from 'express';
import { NoSessionError } from '../../error';
import type { TRequestNarrowed } from '../../express.type';

export function authentificateMW(req: TRequestNarrowed, res: Response, next: NextFunction): void {
  if (req.session.user === undefined) {
    throw new NoSessionError({
      message: 'No storage for provided session',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  } else if (req.session.user.isAuthenticated !== true) {
    throw new NoSessionError({
      message: 'User not authenticated, although have session',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  next();
  return;
}
