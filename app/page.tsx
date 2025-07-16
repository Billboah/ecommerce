import ProductCard from "@/components/productCard";
import { ProductType } from "@/types";

async function getProducts(): Promise<ProductType[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 0 }, // For full static generation
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
