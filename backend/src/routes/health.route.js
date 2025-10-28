import { Router } from "express";
import { getHealth, getReady } from "../controllers/health.controller.js";

const router = Router();

router.get("/", getHealth);       // GET /health
router.get("/ready", getReady);   // GET /health/ready

console.log("✅ health.route mounted");
export default router;
