import { Router } from "express";
import { listProducts, getProductById } from "../controllers/products.controller.js";

const router = Router();

router.get("/", listProducts);      // GET /api/products
router.get("/:id", getProductById); // GET /api/products/:id

console.log("✅ products.route mounted");
export default router;
