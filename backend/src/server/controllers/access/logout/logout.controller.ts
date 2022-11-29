import type { NextFunction, Response } from 'express';
import { SessionManager } from '../../../../helpers/session';
import type { TRequestNarrowed } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

// todo: inspect session generation, add check if needed

export const accessLogoutCTR = async (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  await SessionManager.destroy({ session: req.session });

  new SuccessResponse({
    res,
    data: {
      isAuthenticated: false,
    },
  }).send();
};
