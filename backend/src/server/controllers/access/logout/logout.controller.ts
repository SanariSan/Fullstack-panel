import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

// todo: inspect session generation, add check if needed

export const accessLogoutCTR = async (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  await new Promise<void>((resolve, reject) => {
    req.session.destroy((err) => {
      if (err !== undefined) {
        reject();
      }
      resolve();
    });
  });

  new SuccessResponse({
    res,
    data: {
      isAuthenticated: false,
    },
  }).send();
};
