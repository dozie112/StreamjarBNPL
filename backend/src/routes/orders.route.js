import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

/** POST /api/orders  { customerEmail, customerName, productId, quantity } */
router.post("/", async (req, res, next) => {
  try {
    const { customerEmail, customerName, productId, quantity = 1 } = req.body || {};
    if (!customerEmail || !customerName || !productId) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }
    const customer = await prisma.customer.upsert({
      where: { email: customerEmail },
      update: { name: customerName },
      create: { email: customerEmail, name: customerName },
    });
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ ok: false, error: "Product not found" });

    const qty = Math.max(1, parseInt(String(quantity), 10) || 1);
    const total = product.price * qty;

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        productId: product.id,
        quantity: qty,
        total,
        status: "PENDING",
      },
    });
    res.status(201).json({ ok: true, order });
  } catch (e) { next(e); }
});

export default router;
