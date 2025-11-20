// backend/src/app.js

// ---- Core imports ----
import express from "express";
import cors from "cors";
import morgan from "morgan";

// ---- Routers ----
import healthRouter from "./routes/health.route.js";
import dbRouter from "./routes/db.route.js";
import productsRouter from "./routes/products.route.js";
import ordersRouter from "./routes/orders.route.js"; // GET /api/orders + POST /api/orders

// ---- Middleware ----
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// ---- Global middleware (order matters) ----
app.use(cors());           // allow frontend ↔ backend
app.use(express.json());   // parse JSON bodies
app.use(morgan("dev"));    // request logs

// ---- Routes ----
app.use("/health", healthRouter);          // liveness/readiness
app.use("/db", dbRouter);                  // DB ping/checks
app.use("/api/products", productsRouter);  // products CRUD (currently list/detail)
app.use("/api/orders", ordersRouter);      // orders list + create

// ---- Debug helper (safe to remove later) ----
app.get("/__debug_routes", (_req, res) => {
  try {
    const routes = [];
    const push = (r, base = "") => {
      if (!r) return;
      const path = Array.isArray(r.path) ? r.path.join("|") : r.path;
      const methods = Object.keys(r.methods || {});
      routes.push({ path: `${base}${path}`, methods });
    };
    (app._router?.stack || []).forEach((layer) => {
      if (layer.route) return push(layer.route);
      const isRouter = layer.name === "router";
      const stack = layer.handle && layer.handle.stack;
      const base =
        layer.regexp?.fast_slash
          ? ""
          : (layer.regexp?.toString().match(/\/\^\\(.*)\\\/?\(\?\=\/\|\$\)\/i?/)?.[1] || "")
              .replace(/\\\//g, "/")
              .replace(/\$$/, "");
      if (isRouter && Array.isArray(stack)) {
        stack.forEach((s) => s.route && push(s.route, base.startsWith("/") ? base : `/${base}`));
      }
    });
    res.json(routes);
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
});

// ---- Central error handler (always last) ----
app.use(errorHandler);

export default app;
