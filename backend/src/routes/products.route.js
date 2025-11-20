// src/routes/products.route.js
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// GET /api/products
router.get("/", async (_req, res, next) => {
  try {
    const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    res.json(items);
  } catch (e) { next(e); }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ ok: false, error: "Not found" });
    res.json(item);
  } catch (e) { next(e); }
});

// Optional simple ping for smoke tests
router.get("/ping", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

export default router;
