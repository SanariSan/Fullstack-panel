import type { Express, NextFunction, Request, Response } from 'express';
import { ELOG_LEVEL } from '../../general.type';
import { publishError, publishErrorUnexpected } from '../../modules/access-layer/events/pubsub';
import { ExpressError, handleExpress } from '../../server/error';

function setupErrorHandleExpress(app: Express) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // for rare cases when something broke while streaming data to client
    // fallback to default express handler
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof ExpressError) {
      publishError(ELOG_LEVEL.WARN, err);
      handleExpress(err, res);
      res.status(400).json({ error: err.message });
      return;
    }

    publishErrorUnexpected(ELOG_LEVEL.ERROR, err);
    next(err);
  });
}

export { setupErrorHandleExpress };
