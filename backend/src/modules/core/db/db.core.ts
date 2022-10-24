import PgPromise from 'pg-promise';

const pgPromise = PgPromise({
  capSQL: true,
});

const {
  NODE_ENV,
  DB_HOST,
  DB_HOST_PROD,
  DB_PORT,
  DB_PORT_PROD,
  DB_DATABASE_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;
const DB = pgPromise({
  host: NODE_ENV === 'production' ? DB_HOST_PROD : DB_HOST,
  port: NODE_ENV === 'production' ? Number(DB_PORT_PROD) : Number(DB_PORT),
  user: DB_USER,
  database: DB_DATABASE_NAME,
  password: DB_PASSWORD,
  max: 25,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30_000,
});

export { DB };
