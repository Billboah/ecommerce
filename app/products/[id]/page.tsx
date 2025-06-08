import { notFound } from "next/navigation";
import axios from "axios";
import ProductDetailClient from "@/components/productDetailClient";
import { ProductType } from "@/types";

type Props = {
  params: { id: number };
};

export default async function ProductDetailPage({ params }: Props) {
  let product: ProductType | null = null;
  const { id } = await params;
  console.log("Fetching product with ID:", id);

  try {
    const res = await axios.get<ProductType>(
      `https://fakestoreapi.com/products/${id}`
    );
    product = res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
