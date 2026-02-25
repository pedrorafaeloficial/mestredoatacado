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

    const { rows: productRows } = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(productRows[0].count) === 0) {
      console.log('Seeding products...');
      for (const product of INITIAL_PRODUCTS) {
        await client.query(
          `INSERT INTO products (
            id, sku, name, description, price, category_id, images, 
            min_quantity, stock, featured, specifications, reviews, variations
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            product.id,
            product.sku,
            product.name,
            product.description,
            product.price,
            product.categoryId,
            product.images,
            product.minQuantity,
            product.stock,
            product.featured,
            JSON.stringify(product.specifications || {}),
            JSON.stringify(product.reviews || []),
            JSON.stringify(product.variations || [])
          ]
        );
      }
    }

    console.log('Database initialization completed.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

initDb();
