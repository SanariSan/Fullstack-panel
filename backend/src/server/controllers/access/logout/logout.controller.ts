import type { NextFunction, Response } from 'express';
import type { TRequestValidatedCredentials } from '../../../express.type';

export const accessLogoutCTR = async (
  req: TRequestValidatedCredentials,
  res: Response,
  next: NextFunction,
) => {
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
