import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const accessAuthStatusCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  if (req.session.user === undefined || req.session.user.isAuthenticated !== true) {
    new SuccessResponse({
      res,
      data: {
        isAuthenticated: false,
      },
    }).send();
    return;
  }

  new SuccessResponse({
    res,
    data: {
      isAuthenticated: true,
    },
  }).send();
};
