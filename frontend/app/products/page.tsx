// frontend/app/products/page.tsx
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
};

export default async function ProductsPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
  const products: Product[] = await res.json();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
              Products
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Choose a product to create a BNPL order.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-sm text-zinc-600 dark:text-zinc-300 underline hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            View admin orders →
          </Link>
        </header>

      {products.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No products yet.</p>
      ) : (
        <ul className="grid gap-4">
          {products.map((p) => (
            <li
              key={p.id}
              className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">{p.name}</h2>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {p.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    £{(p.price / 100).toFixed(2)}
                  </div>
                  <div className="text-sm text-zinc-500">
                    Stock: {p.stock ?? 0}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link
                  href={`/products/${p.id}`}
                  className="inline-block rounded-lg bg-black text-white px-4 py-2 hover:opacity-90 dark:bg-zinc-100 dark:text-black"
                >
                  View / Buy (BNPL)
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </main>
  );
}
