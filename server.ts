import express from "express";
import { pool } from "./server/db";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Global error handlers to prevent silent crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

async function startServer() {
  console.log("--- Server Starting ---");
  console.log("Mode:", process.env.NODE_ENV || 'development');
  
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  let isDbConnected = false;

  // Test Database Connection
  try {
    console.log("Testing database connection...");
    const client = await pool.connect();
    console.log("Database connection successful!");
    isDbConnected = true;
    
    // Initialize tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sku_prefixes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        prefix TEXT NOT NULL,
        min_quantity INTEGER DEFAULT 6
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

    // Add sku_prefix_id if it doesn't exist
    try {
      await client.query(`ALTER TABLE products ADD COLUMN sku_prefix_id TEXT REFERENCES sku_prefixes(id);`);
    } catch (e) {
      // Column might already exist
    }

    // Add video if it doesn't exist
    try {
      await client.query(`ALTER TABLE products ADD COLUMN video TEXT;`);
    } catch (e) {
      // Column might already exist
    }

    client.release();
  } catch (err) {
    console.error("DATABASE CONNECTION ERROR:", err);
    console.log("Server will continue, but database features will return 503 Service Unavailable.");
    isDbConnected = false;
  }

  // Middleware to check DB connection
  const requireDb = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!isDbConnected) {
      return res.status(503).json({ 
        error: 'Service Unavailable', 
        message: 'Database connection failed. Please check your DATABASE_URL environment variable.' 
      });
    }
    next();
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV, dbConnected: isDbConnected });
  });

  // Categories API
  app.get("/api/categories", requireDb, async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/api/categories", requireDb, async (req, res) => {
    try {
      const { id, name, slug } = req.body;
      const result = await pool.query(
        'INSERT INTO categories (id, name, slug) VALUES ($1, $2, $3) RETURNING *',
        [id, name, slug]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put("/api/categories/:id", requireDb, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, slug } = req.body;
      const result = await pool.query(
        'UPDATE categories SET name = $1, slug = $2 WHERE id = $3 RETURNING *',
        [name, slug, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete("/api/categories/:id", requireDb, async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM categories WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Sku Prefixes API
  app.get("/api/sku-prefixes", requireDb, async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM sku_prefixes ORDER BY name ASC');
      const prefixes = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        prefix: row.prefix,
        minQuantity: row.min_quantity
      }));
      res.json(prefixes);
    } catch (error) {
      console.error('Error fetching sku prefixes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/api/sku-prefixes", requireDb, async (req, res) => {
    try {
      const { id, name, prefix, minQuantity } = req.body;
      const result = await pool.query(
        'INSERT INTO sku_prefixes (id, name, prefix, min_quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, name, prefix, minQuantity || 6]
      );
      res.status(201).json({
        id: result.rows[0].id,
        name: result.rows[0].name,
        prefix: result.rows[0].prefix,
        minQuantity: result.rows[0].min_quantity
      });
    } catch (error) {
      console.error('Error creating sku prefix:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put("/api/sku-prefixes/:id", requireDb, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, prefix, minQuantity } = req.body;
      const result = await pool.query(
        'UPDATE sku_prefixes SET name = $1, prefix = $2, min_quantity = $3 WHERE id = $4 RETURNING *',
        [name, prefix, minQuantity || 6, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json({
        id: result.rows[0].id,
        name: result.rows[0].name,
        prefix: result.rows[0].prefix,
        minQuantity: result.rows[0].min_quantity
      });
    } catch (error) {
      console.error('Error updating sku prefix:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete("/api/sku-prefixes/:id", requireDb, async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM sku_prefixes WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting sku prefix:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Products API
  app.get("/api/products", requireDb, async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products ORDER BY name ASC');
      // Map snake_case to camelCase
      const products = result.rows.map(row => ({
        id: row.id,
        sku: row.sku,
        name: row.name,
        description: row.description,
        price: parseFloat(row.price),
        categoryId: row.category_id,
        skuPrefixId: row.sku_prefix_id,
        images: row.images || [],
        video: row.video,
        minQuantity: row.min_quantity,
        stock: row.stock,
        featured: row.featured,
        specifications: row.specifications || {},
        reviews: row.reviews || [],
        variations: row.variations || []
      }));
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/api/products", requireDb, async (req, res) => {
    try {
      const { id, sku, skuPrefixId, name, description, price, categoryId, images, video, minQuantity, stock, featured, specifications, reviews, variations } = req.body;
      const result = await pool.query(
        `INSERT INTO products (
          id, sku, sku_prefix_id, name, description, price, category_id, images, video,
          min_quantity, stock, featured, specifications, reviews, variations
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
        [
          id, sku, skuPrefixId || null, name, description, price, categoryId, images || [], video || null,
          minQuantity || 1, stock || 0, featured || false,
          JSON.stringify(specifications || {}),
          JSON.stringify(reviews || []),
          JSON.stringify(variations || [])
        ]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put("/api/products/:id", requireDb, async (req, res) => {
    try {
      const { id } = req.params;
      const { sku, skuPrefixId, name, description, price, categoryId, images, video, minQuantity, stock, featured, specifications, reviews, variations } = req.body;
      const result = await pool.query(
        `UPDATE products SET 
          sku = $1, sku_prefix_id = $2, name = $3, description = $4, price = $5, category_id = $6, images = $7, video = $8,
          min_quantity = $9, stock = $10, featured = $11, specifications = $12, reviews = $13, variations = $14
        WHERE id = $15 RETURNING *`,
        [
          sku, skuPrefixId || null, name, description, price, categoryId, images || [], video || null,
          minQuantity || 1, stock || 0, featured || false,
          JSON.stringify(specifications || {}),
          JSON.stringify(reviews || []),
          JSON.stringify(variations || []),
          id
        ]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete("/api/products/:id", requireDb, async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM products WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Initializing Vite middleware (Development Mode)...");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.error("Failed to initialize Vite:", err);
    }
  } else {
    console.log("Production Mode: Serving static files from 'dist'...");
    const distPath = path.resolve(__dirname, "dist");
    
    if (!fs.existsSync(distPath)) {
      console.error("CRITICAL ERROR: 'dist' folder not found!");
      console.log("Make sure you ran 'npm run build' before starting the server.");
    } else {
      app.use(express.static(distPath));
     app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log("--- Server Ready ---");
  });
}

startServer().catch(err => {
  console.error("FATAL ERROR DURING STARTUP:", err);
});
