import type { Express } from 'express';
import express from 'express';
import path from 'node:path';
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
