import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import session from 'express-session';

function setupSettingsExpress(app: Express) {
  const corsUrl =
    process.env.NODE_ENV === 'production'
      ? `${process.env.CORS_URL_PROD}`
      : `${process.env.CORS_URL_DEV}`;

  app.use(helmet());
  // origin: true for mirroring Front 'Origin' header back
  // origin: corsUrl for static env url
  app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 204 }));
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: false }));
  app.set('env', process.env.NODE_ENV);
  app.set('x-powered-by', false);
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      name: 'sid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // secure: process.env.ENVIRONMENT === 'production' ? 'auto' : 'auto',
        secure: false,
        sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'none',
      },
    }),
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.env.BUILD_PATH)));
  }
}

export { setupSettingsExpress };
