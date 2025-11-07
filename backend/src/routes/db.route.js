// src/routes/db.route.js
import { Router } from "express";
import { pingDb } from "../lib/db.js";

const router = Router();

// GET /db/ping
router.get("/ping", async (_req, res) => {
  const result = await pingDb();
  res.status(result.ok ? 200 : 500).json({ service: "db", ...result });
});

export default router;
