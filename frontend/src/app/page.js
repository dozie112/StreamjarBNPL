import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Streamjar Shop 🛍️ (Buy Now, Pay Later)
      </h1>
      <ProductList />
    </main>
  );
}
