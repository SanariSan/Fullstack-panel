import connectRedis from 'connect-redis';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { CacheDBConnectionManager } from '../../db';
// import { DbConnectionError } from '../error';

function setupSettingsExpress(app: Express) {
  const {
    // CORS_URL_PROD,
    NODE_ENV,
    COOKIE_SECRET,
  } = process.env;

  const RedisStore = connectRedis(session);
  const redisClient = CacheDBConnectionManager.getInstance().getConnection();

  // origin: true for mirroring Front 'Origin' header back
  // origin: CORS_URL_PROD for static env url
  // origin: process.env.NODE_ENV === 'production' ? process.env.CORS_URL_PROD : true,
  app.set('env', NODE_ENV);
  app.use(helmet());
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 204,
    }),
  );
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: false }));
  app.set('x-powered-by', false);

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      secret: COOKIE_SECRET,
      name: 'sid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // secure: NODE_ENV === 'production' ? true : 'auto',
        secure: false,
        // sameSite: NODE_ENV === 'production' ? 'lax' : 'none',
        sameSite: NODE_ENV === 'production' ? 'none' : 'none',
      },
    }),
  );
}

export { setupSettingsExpress };
