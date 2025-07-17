import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ProductDetailClient from "@/components/productDetailClient";
import { ProductType } from "@/types";

interface ProductDetailProps {
  product?: ProductType | null;
}

export default function ProductDetailPage({ product }: ProductDetailProps) {
  const router = useRouter();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6 text-gray-600">
            We couldn&apos;t find the product you&apos;re looking for.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}

// Build all product detail pages statically
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: { id: number }[] = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false, // if not found, show 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      return {
        props: {
          product: null,
        },
      };
    }

    const product: ProductType = await res.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      props: {
        product: null,
      },
    };
  }
};
