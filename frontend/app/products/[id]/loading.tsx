export default function LoadingProduct() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-14 animate-pulse">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />

          <div className="space-y-4">
            <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
