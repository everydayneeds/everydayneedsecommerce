import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("everyday_needs.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'buyer',
    name TEXT,
    phone TEXT,
    address TEXT,
    is_seller_verified INTEGER DEFAULT 0,
    kyc_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS boxes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    image_url TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    sku TEXT UNIQUE,
    supplier_id INTEGER,
    inventory INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS box_products (
    box_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(box_id) REFERENCES boxes(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    box_id INTEGER,
    plan TEXT, -- monthly, quarterly, annual
    status TEXT DEFAULT 'active',
    next_delivery_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(box_id) REFERENCES boxes(id)
  );
`);

// Seed initial data if empty
const boxCount = db.prepare("SELECT COUNT(*) as count FROM boxes").get() as { count: number };
if (boxCount.count === 0) {
  const insertBox = db.prepare("INSERT INTO boxes (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)");
  const insertProduct = db.prepare("INSERT INTO products (name, price, sku, inventory) VALUES (?, ?, ?, ?)");
  const insertBoxProduct = db.prepare("INSERT INTO box_products (box_id, product_id, quantity) VALUES (?, ?, ?)");
  
  // 1. Pantry Provisions
  const pantryId = insertBox.run("Pantry Provisions Box", "Core pantry essentials for everyday cooking.", 34500, "https://picsum.photos/seed/pantry/800/600", "Pantry").lastInsertRowid;
  const p1 = insertProduct.run("10kg Premium Rice", 18500, "RIC-001", 100).lastInsertRowid;
  const p2 = insertProduct.run("1kg Spaghetti (2 packs)", 1600, "SPA-001", 100).lastInsertRowid;
  insertBoxProduct.run(pantryId, p1, 1);
  insertBoxProduct.run(pantryId, p2, 1);

  // 2. Farm Fresh
  const farmId = insertBox.run("Farm Fresh Harvest Box", "Fresh vegetables sourced directly from farmers.", 14000, "https://picsum.photos/seed/farm/800/600", "Fresh").lastInsertRowid;
  const f1 = insertProduct.run("Fresh Tomatoes (5kg)", 5500, "TOM-001", 50).lastInsertRowid;
  const f2 = insertProduct.run("Fresh Pepper Mix", 3000, "PEP-001", 50).lastInsertRowid;
  insertBoxProduct.run(farmId, f1, 1);
  insertBoxProduct.run(farmId, f2, 1);

  // 3. Prime Cuts
  const primeId = insertBox.run("Prime Cuts Box", "Quality protein essentials.", 26000, "https://picsum.photos/seed/meat/800/600", "Protein").lastInsertRowid;
  const m1 = insertProduct.run("Whole Chicken", 6800, "CHI-001", 30).lastInsertRowid;
  const m2 = insertProduct.run("Beef (2kg)", 8500, "BEE-001", 30).lastInsertRowid;
  insertBoxProduct.run(primeId, m1, 1);
  insertBoxProduct.run(primeId, m2, 1);

  // 4. Morning Essentials
  const morningId = insertBox.run("Morning Essentials Box", "Breakfast staples for a great start.", 15500, "https://picsum.photos/seed/breakfast/800/600", "Breakfast").lastInsertRowid;
  const b1 = insertProduct.run("Cornflakes", 2800, "COR-001", 100).lastInsertRowid;
  const b2 = insertProduct.run("Milk (Peak 900g)", 5500, "MIL-001", 100).lastInsertRowid;
  insertBoxProduct.run(morningId, b1, 1);
  insertBoxProduct.run(morningId, b2, 1);

  // Add more boxes as needed...
  insertBox.run("Pure Bliss Pamper Kit", "Personal care and hygiene essentials.", 13900, "https://picsum.photos/seed/pamper/800/600", "Personal Care");
  insertBox.run("Little Bundle of Joy", "Everything for your little one.", 15000, "https://picsum.photos/seed/baby/800/600", "Baby");
  insertBox.run("Sparkling Sanctuary Solutions", "Cleaning and home maintenance supplies.", 10200, "https://picsum.photos/seed/cleaning/800/600", "Home");
  insertBox.run("Zen Wellness Wonders", "Health and wellness essentials.", 10800, "https://picsum.photos/seed/wellness/800/600", "Wellness");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/boxes", (req, res) => {
    const boxes = db.prepare("SELECT * FROM boxes").all();
    res.json(boxes);
  });

  app.get("/api/boxes/:id", (req, res) => {
    const box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(req.params.id);
    if (!box) return res.status(404).json({ error: "Box not found" });
    
    const products = db.prepare(`
      SELECT p.*, bp.quantity 
      FROM products p 
      JOIN box_products bp ON p.id = bp.product_id 
      WHERE bp.box_id = ?
    `).all(req.params.id);
    
    res.json({ ...box, products });
  });

  app.get("/api/subscriptions", (req, res) => {
    const userId = req.query.userId;
    const subs = db.prepare(`
      SELECT s.*, b.name as box_name, b.image_url 
      FROM subscriptions s 
      JOIN boxes b ON s.box_id = b.id 
      WHERE s.user_id = ?
    `).all(userId);
    res.json(subs);
  });

  app.post("/api/subscriptions", (req, res) => {
    const { userId, boxId, plan } = req.body;
    const nextDelivery = new Date();
    nextDelivery.setDate(nextDelivery.getDate() + 30);
    
    const id = db.prepare(`
      INSERT INTO subscriptions (user_id, box_id, plan, next_delivery_date) 
      VALUES (?, ?, ?, ?)
    `).run(userId, boxId, plan, nextDelivery.toISOString()).lastInsertRowid;
    
    res.json({ id, status: "success" });
  });

  app.post("/api/auth/kyc", (req, res) => {
    const { userId, kycData } = req.body;
    db.prepare("UPDATE users SET kyc_data = ?, is_seller_verified = 1, role = 'seller' WHERE id = ?").run(JSON.stringify(kycData), userId);
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    res.json({ user });
  });

  app.post("/api/auth/switch-role", (req, res) => {
    const { userId, role } = req.body;
    db.prepare("UPDATE users SET role = ? WHERE id = ?").run(role, userId);
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    res.json({ user });
  });

  // Auth (Mock for now)
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Simple mock auth
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (user) {
      res.json({ user });
    } else {
      // Create a default user for demo
      const id = db.prepare("INSERT INTO users (email, name, role) VALUES (?, ?, ?)").run(email, "Demo User", "buyer").lastInsertRowid;
      const newUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
      res.json({ user: newUser });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
