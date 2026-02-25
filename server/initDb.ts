import { pool } from './db';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../src/types/store';

async function initDb() {
  const client = await pool.connect();
  try {
    console.log('Creating tables...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        sku TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category_id TEXT REFERENCES categories(id),
        images TEXT[],
        min_quantity INTEGER DEFAULT 1,
        stock INTEGER DEFAULT 0,
        featured BOOLEAN DEFAULT FALSE,
        specifications JSONB,
        reviews JSONB DEFAULT '[]',
        variations JSONB DEFAULT '[]'
      );
    `);

    console.log('Tables created successfully.');

    // Check if data exists
    const { rows: categoryRows } = await client.query('SELECT COUNT(*) FROM categories');
    if (parseInt(categoryRows[0].count) === 0) {
      console.log('Seeding categories...');
      for (const category of INITIAL_CATEGORIES) {
        await client.query(
          'INSERT INTO categories (id, name, slug) VALUES ($1, $2, $3)',
          [category.id, category.name, category.slug]
        );
      }
    }

    // Clean up old demo products if they exist
    const demoSkus = ['TSH-001', 'AUD-002', 'WAT-003', 'BEA-004', 'SHO-005', 'BAG-006'];
    for (const sku of demoSkus) {
      await client.query('DELETE FROM products WHERE sku = $1', [sku]);
    }

    // Products are no longer seeded automatically
    console.log('Database initialization completed.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

initDb();
