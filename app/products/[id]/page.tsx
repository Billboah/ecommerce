import { notFound } from "next/navigation";
import axios from "axios";
import ProductDetailClient from "@/components/productDetailClient";
import { ProductType } from "@/types";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = params;

  try {
    const res = await axios.get<ProductType>(
      `https://fakestoreapi.com/products/${id}`
    );
    const product = res.data;

    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
}
