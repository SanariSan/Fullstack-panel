import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

class CacheDBConnectionManager {
  private static instance?: CacheDBConnectionManager;

  private readonly client: RedisClientType;

  private readonly host: string = process.env.CACHE_HOST;

  private readonly port: number = Number(process.env.CACHE_PORT);

  private readonly user: string = '';

  private readonly database: string = '0';

  private readonly password: string = process.env.CACHE_PASSWORD;

  private constructor() {
    this.client = createClient({
      url: `redis://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`,

      // legacyMode: true,
    });

    void this.client.connect().catch((error) => {
      console.error(error);
    });
  }

  protected getClient() {
    return this.client;
  }

  public getConnection() {
    return this.getClient();
  }

  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new CacheDBConnectionManager();
    }

    return this.instance;
  }
}

export { CacheDBConnectionManager };
