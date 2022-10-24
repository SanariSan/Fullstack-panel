import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';

export const accessAuthStatusCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  if (
    req.session.user &&
    req.session.user.login !== undefined &&
    req.session.user.isAuthenticated === true
  ) {
    res.json({
      login: req.session.user.login,
      isAuthenticated: true,
    });
    return;
  }

  res.json({
    isAuthenticated: false,
  });
  return;
};
