import PgPromise from 'pg-promise';

const pgPromise = PgPromise({
  capSQL: true,
});

const { DB_HOST, DB_PORT, DB_DATABASE_NAME, DB_USER, DB_PASSWORD } = process.env;
const DB = pgPromise({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  max: 25,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30_000,
});

export { DB };
