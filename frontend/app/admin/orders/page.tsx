// frontend/app/admin/orders/page.tsx
"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  quantity: number;
  total: number;
  status: string;
  createdAt: string;
  product: { name: string; price: number };
  customer: { email: string; name: string };
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/orders?limit=100`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiBase]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black px-8 py-16">
      <h1 className="text-3xl font-semibold mb-8 text-zinc-900 dark:text-zinc-50">
        🧾 Admin — Recent BNPL Orders
      </h1>

      {loading ? (
        <p className="text-zinc-600 dark:text-zinc-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No orders yet.</p>
      ) : (
        <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="p-3 border border-zinc-300 dark:border-zinc-700">ID</th>
              <th className="p-3 border border-zinc-300 dark:border-zinc-700">Customer</th>
              <th className="p-3 border border-zinc-300 dark:border-zinc-700">Product</th>
              <th className="p-3 border border-zinc-300 dark:border-zinc-700">Qty</th>
              <th className="p-3 border border-zinc-300 dark:border-zinc-700">Total (£)</th>
              <th className="p-3 border border-zinc-300 dark:border-zinc-700">Status</th>
              <th className="p-3 border border-zinc-300 dark:border-zinc-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <td className="p-3 border border-zinc-300 dark:border-zinc-700 font-mono text-xs">
                  {o.id.slice(0, 8)}…
                </td>
                <td className="p-3 border border-zinc-300 dark:border-zinc-700">
                  {o.customer?.name} <br />
                  <span className="text-zinc-500 text-xs">{o.customer?.email}</span>
                </td>
                <td className="p-3 border border-zinc-300 dark:border-zinc-700">{o.product?.name}</td>
                <td className="p-3 border border-zinc-300 dark:border-zinc-700 text-center">{o.quantity}</td>
                <td className="p-3 border border-zinc-300 dark:border-zinc-700 text-right">
                  £{(o.total / 100).toFixed(2)}
                </td>
                <td className="p-3 border border-zinc-300 dark:border-zinc-700">{o.status}</td>
                <td className="p-3 border border-zinc-300 dark:border-zinc-700 text-zinc-500">
                  {new Date(o.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
