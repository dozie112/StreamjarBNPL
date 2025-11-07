// src/lib/db.js
import pkg from "pg";
const { Pool } = pkg;

// Create a connection pool using DATABASE_URL from the environment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Simple test function to verify connection
export async function pingDb() {
  try {
    const { rows } = await pool.query("SELECT version();");
    return { ok: true, version: rows?.[0]?.version };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

export default pool;
