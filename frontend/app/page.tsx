"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("alice@example.com");
  const [name, setName] = useState("Alice");
  const [qtyById, setQtyById] = useState<Record<string, number>>({}); // quantity per product
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/products`, { cache: "no-store" });
        const json = await res.json();
        setProducts(json);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiBase]);

  async function handleBuy(productId: string) {
    try {
      const quantity = qtyById[productId] ?? 1;
      const res = await fetch(`${apiBase}/api/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          customerName: name,
          productId,
          quantity,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        alert(`Order failed: ${data?.error || res.status}`);
        return;
      }
      alert(`Order created! id=${data.order.id} total=£${(data.order.total / 100).toFixed(2)}`);
    } catch (e: any) {
      alert(`Order error: ${e?.message || e}`);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* Header */}
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />

        {/* Customer quick form */}
        <div className="w-full my-6 grid gap-3">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Streamjar BNPL — Products</h1>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              className="rounded-lg border border-zinc-300 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Customer email"
            />
            <input
              className="rounded-lg border border-zinc-300 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name"
            />
          </div>
        </div>

        {/* Product list */}
        <div className="w-full">
          {loading ? (
            <p className="text-zinc-600 dark:text-zinc-400">Loading products...</p>
          ) : (
            <ul className="grid gap-4 w-full">
              {products.map((p) => (
               <li
  key={p.id}
  className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900"
>
  {/* Clickable area to details page */}
  <Link href={`/products/${p.id}`} className="block group">
    {/* Optional image if you have p.image */}
    {/* <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
      <Image src={p.image || "/placeholder.png"} alt={p.name} fill className="object-cover" />
    </div> */}

    <h2 className="text-xl font-medium group-hover:underline">{p.name}</h2>
  </Link>

  <p className="text-zinc-600 dark:text-zinc-400">{p.description}</p>
  <div className="mt-2 flex items-center gap-3">
    <span className="font-semibold">£{(p.price / 100).toFixed(2)}</span>
    <span className="text-sm text-zinc-500">Stock: {p.stock ?? 0}</span>
  </div>

  <div className="mt-3 flex items-center gap-2">
    <input
      type="number"
      min={1}
      className="w-20 rounded-lg border border-zinc-300 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700"
      value={qtyById[p.id] ?? 1}
      onChange={(e) =>
        setQtyById((prev) => ({ ...prev, [p.id]: Math.max(1, Number(e.target.value) || 1) }))
      }
    />
    <button
      className="rounded-lg bg-black text-white px-4 py-2 hover:opacity-90 dark:bg-zinc-100 dark:text-black"
      onClick={() => handleBuy(p.id)}
    >
      Buy (BNPL)
    </button>
  </div>
</li>
 
              ))}
            </ul>
          )}
        </div>

        {/* Footer buttons (kept) */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={16} height={16} />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
