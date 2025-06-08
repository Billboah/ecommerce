"use client";

import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../app/context/CartContext";
import { Loader, LoaderText } from "@/lib/loaders";
import { useState } from "react";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      <Link
        href={`/products/${product.id}`}
        className="block relative h-48 sm:h-64"
      >
        {!isImageLoaded && <Loader />}
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "contain" }}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
          onLoadingComplete={() => setIsImageLoaded(true)}
          className={`object-contain transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mt-1">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-blue-600 font-bold">
            ${product.price.toFixed(2)}
          </span>
          <div>
            <button
              onClick={() => handleSave(product)}
              className="bg-blue-500 mr-3 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-300 text-white text-sm px-3 py-1 rounded transition-transform duration-100 ease-in-out active:scale-95"
            >
              Save
            </button>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-300 text-white text-sm px-3 py-1 rounded transition-transform duration-100 ease-in-out active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
