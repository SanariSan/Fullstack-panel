import type { Express } from 'express';
import path from 'node:path';
import * as apiBranches from '../../server/routers';
import type { TApiBranches } from '../../server/routers';

function setupRoutersExpress(app: Express) {
  if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(process.env.BUILD_PATH, 'index.html'));
    });
  }

  const apiVersion = process.env.API_VERSION;
  app.use(`/${apiVersion}`, (apiBranches as unknown as TApiBranches)[apiVersion]);
}

export { setupRoutersExpress };
