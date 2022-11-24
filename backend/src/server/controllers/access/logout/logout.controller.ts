import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';

// todo: inspect session generation, add check if needed

export const accessLogoutCTR = async (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  // if (req.session.user === undefined || req.session.user.isAuthenticated !== true) {
  // throw new ForbiddenError
  // }

  await new Promise<void>((resolve, reject) => {
    req.session.destroy((err) => {
      if (err !== undefined) {
        reject();
      }
      resolve();
    });
  });

  res.json({ isAuthenticated: false });
  return;
};
