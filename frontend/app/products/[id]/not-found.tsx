import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Product Not Found
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400">
          The product you’re looking for doesn’t exist or may have been removed.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-black text-white px-4 py-2 hover:opacity-90 dark:bg-zinc-100 dark:text-black"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
