import type { Express, NextFunction, Request, Response } from 'express';
import { ELOG_LEVEL } from '../../general.type';
import { publishError, publishErrorUnexpected } from '../../modules/access-layer/events/pubsub';
import { GenericExpressError, handleExpress, InternalError } from '../../server/error';

function setupErrorHandleExpress(app: Express) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // for rare cases when something broke while streaming data to client
    // fallback to default express handler
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof GenericExpressError) {
      publishError(ELOG_LEVEL.WARN, err);
      handleExpress(err, res);
      return;
    }

    publishErrorUnexpected(ELOG_LEVEL.ERROR, err);
    handleExpress(
      new InternalError({
        message: 'Internal error',
        miscellaneous: {
          message: err.message,
        },
      }),
      res,
    );
  });
}

export { setupErrorHandleExpress };
