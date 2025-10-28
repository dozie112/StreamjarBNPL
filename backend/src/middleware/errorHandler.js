export const errorHandler = (err, _req, res, _next) => {
  console.error("❌ Error:", err?.message || err);
  res.status(err?.status || 500).json({
    ok: false,
    error: err?.message || "Internal Server Error",
  });
};
