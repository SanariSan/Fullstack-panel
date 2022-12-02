import connectRedis from 'connect-redis';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { CacheDBConnectionManager } from '../../db';
import { DbConnectionError } from '../error';

// TODO: move redis connection OUT
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

  const sessionMW = session({
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
  });

  app.use(sessionMW);

  // redis session obtain retries (while crashed/restarting)
  // https://github.com/expressjs/session/issues/99#issuecomment-63853989
  app.use((req, res, next) => {
    const retriesMax = 10;
    let retries = 0;

    const customNext = (error?: unknown) => {
      if (error !== undefined && error !== null) {
        next(error);
        return;
      }
      retries += 1;

      if ((req.session as typeof req.session | undefined) !== undefined) {
        next();
        return;
      }

      if (retries >= retriesMax) {
        next(
          new DbConnectionError({
            message: `Could not reconnect to redis after ${retriesMax} attempts`,
          }),
        );
        return;
      }

      sessionMW(req, res, customNext);
    };

    customNext();
  });
}

export { setupSettingsExpress };
