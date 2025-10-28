"use client";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
          <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-md" />
          <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
          <p className="text-gray-500 text-sm">{p.description}</p>
          <p className="text-blue-600 font-medium mt-1">
            £{(p.price / 100).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
