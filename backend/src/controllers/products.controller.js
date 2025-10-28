import { PRODUCTS } from "../data/products.js";

export const listProducts = (_req, res) => {
  res.json(PRODUCTS);
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return res.status(404).json({ ok: false, error: "Product not found" });
  res.json(product);
};
