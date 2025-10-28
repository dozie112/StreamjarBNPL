// src/app.js
console.log("🟦 app.js LOADED");

// ---- Imports ----
import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRouter from "./routes/health.route.js";
import productsRouter from "./routes/products.route.js";   // ✅ added router import
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// ---- Core middleware (order matters) ----
app.use(cors());            // enables frontend ↔ backend communication
app.use(express.json());    // parses incoming JSON requests
app.use(morgan("dev"));     // logs each HTTP request (useful for debugging)

// ---- Routes ----
console.log("🟩 Mounting API routes");

// Health routes (service checks)
app.use("/health", healthRouter);

// ✅ Products routes (main feature for BNPL store)
app.use("/api/products", productsRouter);

// ---- Central error handler (always last) ----
app.use(errorHandler);

// --- SAFE DEBUG: list all registered routes (temporary helper) ---
app.get("/__debug_routes", (_req, res) => {
  try {
    const routes = [];

    const pushRoute = (route, mountPath = "") => {
      if (!route) return;
      const path = Array.isArray(route.path) ? route.path.join("|") : route.path;
      const methods = Object.keys(route.methods || {});
      routes.push({ path: `${mountPath}${path}`, methods });
    };

    (app._router?.stack || []).forEach((layer) => {
      // Direct app route (e.g., app.get('/x', ...))
      if (layer.route) {
        pushRoute(layer.route);
        return;
      }

      // Mounted router (e.g., app.use('/health', healthRouter))
      const isRouter = layer.name === "router";
      const stack = layer.handle && layer.handle.stack;
      if (isRouter && Array.isArray(stack)) {
        // Attach both /health and /api/products dynamically
        stack.forEach((sublayer) => {
          if (sublayer.route) {
            const prefix = layer.regexp?.source.includes("health")
              ? "/health"
              : "/api/products";
            pushRoute(sublayer.route, prefix);
          }
        });
      }
    });

    res.json(routes);
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
});

export default app;
