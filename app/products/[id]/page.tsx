/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/productDetailClient";
import { ProductType } from "@/types";

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: { id: number }[] = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) return notFound();

    const product: ProductType = await res.json();

    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
}
