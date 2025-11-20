import Image from "next/image";
import { notFound } from "next/navigation";
import BuyForm from "./BuyForm";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  image?: string;
  stock?: number;
};

async function getProduct(id: string): Promise<Product | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-14">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={product!.image || "/placeholder.png"}
              alt={product!.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {product!.name}
            </h1>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              {product!.description}
            </p>

            <div className="mt-4">
              <span className="text-xl font-semibold">
                £{(product!.price / 100).toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-zinc-500">
                Stock: {product!.stock ?? 0}
              </span>
            </div>

            {/* Buy form */}
            <BuyForm productId={product!.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
