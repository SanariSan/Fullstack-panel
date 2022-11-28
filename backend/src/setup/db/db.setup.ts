import { DBPoolConnectionManager } from '../../db';
import { ELOG_LEVEL } from '../../general.type';
import { sleep } from '../../helpers/util';
import { publishError, publishLog } from '../../modules/access-layer/events/pubsub';
import { DbConnectionError } from '../error/db-connection.error';

export async function setupDb() {
  const retriesMax = 10;
  for (let i = 1; i <= retriesMax; i += 1) {
    publishLog(ELOG_LEVEL.WARN, `DB connection attempt ${String(i)}`);

    const connection = await DBPoolConnectionManager.getInstance()
      .getPool()
      .connect()
      .catch((error: Error): undefined => {
        publishError(ELOG_LEVEL.WARN, error);
        return;
      });

    if (connection !== undefined) {
      publishLog(ELOG_LEVEL.WARN, `DB connection success`);

      await connection.done();
      return;
    }

    await sleep(5000);
  }

  throw new DbConnectionError(`Could not connect to db after ${retriesMax} attempts`);
}
