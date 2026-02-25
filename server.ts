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

  app.use(express.json());

  // Test Database Connection
  try {
    console.log("Testing database connection...");
    const client = await pool.connect();
    console.log("Database connection successful!");
    client.release();
  } catch (err) {
    console.error("DATABASE CONNECTION ERROR:", err);
    console.log("Server will continue, but database features may fail.");
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
  });

  app.get("/api/products", async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching products:', error);
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
     app.get('/:path(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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
