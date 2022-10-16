import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import path from 'node:path';

function setupSettingsExpress(app: Express) {
  const corsUrl =
    process.env.NODE_ENV === 'production'
      ? `${process.env.CORS_URL_PROD}`
      : `${process.env.CORS_URL_DEV}`;

  app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: false }));
  app.set('env', process.env.NODE_ENV);
  app.set('x-powered-by', false);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.env.BUILD_PATH)));
  }
}

export { setupSettingsExpress };
