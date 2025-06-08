import { notFound } from "next/navigation";
import axios from "axios";
import ProductDetailClient from "@/components/productDetailClient";
import { ProductType } from "@/types";

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  let product: ProductType | null = null;

  try {
    const res = await axios.get<ProductType>(
      `https://fakestoreapi.com/products/${params.id}`
    );
    product = res.data;
  } catch (error) {
    return notFound();
  }

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
