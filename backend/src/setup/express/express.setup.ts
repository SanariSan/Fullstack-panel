import express from 'express';
import { publishError, publishLog } from '../../access-layer/events/pubsub';
import { ELOG_LEVEL } from '../../general.type';
import { setupErrorHandleExpress } from './error-handler.setup';
import { setupRoutersExpress } from './routers.setup';
import { setupSettingsExpress } from './settings.setup';

export function setupExpress() {
  const app = express();

  setupSettingsExpress(app);
  setupRoutersExpress(app);
  setupErrorHandleExpress(app);

  publishLog(ELOG_LEVEL.WARN, Number(process.env.PORT));

  const server = app
    .listen(Number(process.env.PORT), () => {
      publishLog(ELOG_LEVEL.WARN, `Server running on port : ${process.env.PORT}`);
    })
    .on('error', (e) => {
      publishError(ELOG_LEVEL.WARN, e);
    });

  // TODO: when will be more signal listeners in other modules - find way to wait for all of them before calling process.exit()
  function gracefulShutdown(signal: NodeJS.Signals) {
    if (gracefulShutdown.triggered) {
      return;
    }
    gracefulShutdown.triggered = true;

    console.warn(`Gracefully shutting down server; signal - ${signal}`);
    server.close(() => process.exit(0));
  }
  gracefulShutdown.triggered = false;

  /* eslint-disable @typescript-eslint/no-misused-promises */
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGHUP', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGQUIT', gracefulShutdown);
}
