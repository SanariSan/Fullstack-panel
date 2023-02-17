import type { Express, NextFunction, Request, Response } from 'express';
import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { ELOG_LEVEL } from '../../general.type';
import { publishLog } from '../../modules/access-layer/events/pubsub';
import { NotFoundError } from '../../server/error';
import type { TApiBranches } from '../../server/routers';
import * as apiBranches from '../../server/routers';

function setupRoutersExpress(app: Express) {
  const { NODE_ENV, API_VERSION, BUILD_PATH } = process.env;

  if (NODE_ENV === 'production') {
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(BUILD_PATH, 'index.html'));
    });
  }

  app.use((req: Request, res: Response, next: NextFunction) => {
    const xRealIp = req.headers['x-real-ip'];
    const xForwardedFor = req.headers['x-forwarded-for'];
    let ip: string;

    if (xRealIp !== undefined) {
      ip = `${xRealIp.toString()}`;
    } else if (xForwardedFor !== undefined) {
      [ip] = `${xForwardedFor.toString()}`.split(',');
    } else {
      ip = `${req.socket.remoteAddress ?? ''}`;
    }

    publishLog(ELOG_LEVEL.INFO, {
      ip,
      url: req.url,
    });
    next();
  });

  const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 30, // Limit each IP to 30 requests per 1 min
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(apiLimiter);

  // console.dir(apiBranches, { depth: 10 }); // => { v1: [Getter], v2: [Getter] }
  app.use(`/api/${API_VERSION}`, (apiBranches as unknown as TApiBranches)[API_VERSION]);

  if (NODE_ENV === 'production') {
    app.use(express.static(path.resolve(BUILD_PATH)));
  }

  app.all(`*`, () => {
    throw new NotFoundError({ message: 'Route not found' });
  });
}

export { setupRoutersExpress };
