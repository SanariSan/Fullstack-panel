import type { NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../../general.type';
import { publishLog } from '../../../modules/access-layer/events/pubsub';
import type { TRequestNarrowed } from '../../express.type';

export function authentificateMW(req: TRequestNarrowed, res: Response, next: NextFunction): void {
  if (req.session.user === undefined || req.session.user.isAuthenticated !== true) {
    publishLog(ELOG_LEVEL.DEBUG, `User not authenticated, no session`);
    res.status(403).send({
      isAuthenticated: false,
    });
    return;
  }

  next();
  return;
}
