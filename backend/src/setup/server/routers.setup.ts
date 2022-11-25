import type { Express } from 'express';
import path from 'node:path';
import * as apiBranches from '../../server/routers';
import type { TApiBranches } from '../../server/routers';
import { NotFoundError } from '../../server/error';

function setupRoutersExpress(app: Express) {
  if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(process.env.BUILD_PATH, 'index.html'));
    });
  }

  // console.dir(apiBranches, { depth: 10 }); // => { v1: [Getter], v2: [Getter] }

  const apiVersion = process.env.API_VERSION;
  app.use(`/api/${apiVersion}`, (apiBranches as unknown as TApiBranches)[apiVersion]);
  app.use(`/`, () => {
    throw new NotFoundError({ message: 'Route not found' });
  });
}

export { setupRoutersExpress };
