import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 
  (process.env.PGHOST ? `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=disable` : undefined) ||
  'postgres://postgres:09b40f73fcf9ee321325@sites_mestredoatacado-db:5432/mestredoatacado-db?sslmode=disable';

export const pool = new Pool({
  connectionString,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Do not exit, just log
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
