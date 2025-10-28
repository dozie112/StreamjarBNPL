console.log("🟨 server.js STARTING");          // add this at the very top

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

// TEMP: add an inline route here to prove we're modifying the same app instance
app.get("/health-inline", (_req, res) => res.json({ ok: true, inline: true }));

app.listen(PORT, HOST, () => {
  console.log(`✅ BNPL backend running on http://${HOST}:${PORT}`);
});
