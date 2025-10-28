export const getHealth = (_req, res) => {
  res.json({ ok: true, service: "bnpl-backend", ts: new Date().toISOString() });
};

export const getReady = (_req, res) => {
  // later: check DB/external deps here
  res.json({ ok: true });
};
