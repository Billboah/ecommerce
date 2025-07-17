import ProductCard from "@/components/productCard";
import { ProductType } from "@/types";

export async function getStaticProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products: ProductType[] = await res.json();
    return { props: { products } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } };
  }
}

export default function Home({ products }: { products: ProductType[] }) {
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
