"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductType } from "@/types";
import { useCart } from "../../context";
import Image from "next/image";

export default function SavedItemsPage() {
  const { addToCart } = useCart();
  const [saved, setSaved] = useState<ProductType[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedProducts") || "[]");
    setSaved(stored);
  }, []);

  const removeItem = (id: number) => {
    const updated = saved.filter((item) => item.id !== id);
    localStorage.setItem("savedProducts", JSON.stringify(updated));
    setSaved(updated);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Products</h1>
      {saved.length === 0 ? (
        <p className="text-gray-600">No saved items.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {saved.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between relative p-4 border rounded shadow hover:shadow-md transition"
            >
              <div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-2 right-2 text-red-500 text-xl font-bold"
                  title="Remove from saved"
                >
                  &times;
                </button>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={160}
                  className="object-contain mb-2 w-full bg-white rounded"
                  style={{ height: "160px" }}
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-blue-600 font-bold mt-1">${product.price}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Link
                  href={`/product/${product.id}`}
                  className="text-blue-500 text-sm underline mt-2 block"
                >
                  View Product
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="text-blue-500 text-sm underline mt-2 block cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
