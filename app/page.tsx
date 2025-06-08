import axios from "axios";
import ProductCard from "@/components/productCard";
import { ProductType } from "@/types";

export default async function Home() {
  let products: ProductType[] = [];

  try {
    const response = await axios.get<ProductType[]>(
      "https://fakestoreapi.com/products"
    );
    products = response.data;
  } catch (error) {
    console.log(error);
  }

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
