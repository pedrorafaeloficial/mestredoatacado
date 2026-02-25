import { Pool } from 'pg';

let connectionString = process.env.DATABASE_URL || 
  (process.env.PGHOST ? `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=disable` : undefined) ||
  'postgres://postgres:09b40f73fcf9ee321325@sites_mestredoatacado-db:5432/mestredoatacado-db?sslmode=disable';

// Log which connection method is being used (masking password)
if (process.env.DATABASE_URL) {
  console.log("DB: Using DATABASE_URL");
} else if (process.env.PGHOST) {
  console.log(`DB: Using individual variables (Host: ${process.env.PGHOST})`);
} else {
  console.log("DB: Using hardcoded fallback connection string");
}

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000, // 5 second timeout
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Do not exit, just log
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
