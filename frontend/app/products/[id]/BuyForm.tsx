"use client";

import { useState } from "react";

export default function BuyForm({ productId }: { productId: string }) {
  const [email, setEmail] = useState("alice@example.com");
  const [name, setName] = useState("Alice");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          customerName: name,
          productId,
          quantity: qty,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        alert(`Order failed: ${data?.error || res.status}`);
        return;
      }
      alert(
        `✅ Order created!\nID: ${data.order.id}\nTotal: £${(data.order.total / 100).toFixed(
          2
        )}`
      );
    } catch (e: any) {
      alert(`Order error: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3">
      <input
        className="rounded-lg border border-zinc-300 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Customer email"
      />
      <input
        className="rounded-lg border border-zinc-300 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Customer name"
      />
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          className="w-24 rounded-lg border border-zinc-300 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-60 dark:bg-zinc-100 dark:text-black"
        >
          {loading ? "Processing…" : "Buy (BNPL)"}
        </button>
      </div>
    </form>
  );
}
