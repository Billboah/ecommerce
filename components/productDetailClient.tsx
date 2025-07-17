import { ProductType } from "@/types";
import Image from "next/image";
import { useCart } from "@/context";
import { Loader } from "@/lib/loaders";
import { useState } from "react";

type Props = {
  product: ProductType;
};

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleSave = (product: ProductType) => {
    const saved = JSON.parse(localStorage.getItem("savedProducts") || "[]");

    const alreadySaved = saved.find(
      (item: ProductType) => item.id === product.id
    );
    if (alreadySaved) {
      alert("Item already saved!");
      return;
    }

    const updated = [...saved, product];
    localStorage.setItem("savedProducts", JSON.stringify(updated));
    alert("Product saved to wishlist!");
  };

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative h-[400px] bg-white rounded shadow">
          {!isImageLoaded && <Loader />}

          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            onLoad={() => setIsImageLoaded(true)}
            className={`object-contain transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="mt-3 text-gray-700 text-lg">{product.description}</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleSave(product)}
                className=" bg-blue-500 mr-3 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-300 text-white text-sm px-5 py-3 rounded transition-transform duration-100 ease-in-out active:scale-95"
              >
                Save
              </button>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500  hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-300 text-white text-sm px-5 py-3 rounded transition-transform duration-100 ease-in-out active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
