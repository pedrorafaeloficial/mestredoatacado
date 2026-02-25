import { Pool } from 'pg';

// Remove PG environment variables that might interfere with the connection string
delete process.env.PGHOST;
delete process.env.PGUSER;
delete process.env.PGPASSWORD;
delete process.env.PGDATABASE;
delete process.env.PGPORT;

let connectionString = 'postgres://postgres:09b40f73fcf9ee321325@easypanel.agenciafoxon.com.br:3050/mestredoatacado-db?sslmode=disable';

// Log which connection method is being used (masking password)
console.log("DB: Using hardcoded connection string provided by user");

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000, // 5 second timeout
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Do not exit, just log
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
