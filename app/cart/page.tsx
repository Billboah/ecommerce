"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="bg-white p-4 rounded shadow flex justify-between items-start"
              >
                <div className="flex">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="object-contain mr-2 rounded-md"
                    style={{ height: "60px" }}
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Cart Total: ${total.toFixed(2)}</p>
            <Link
              href="/checkout"
              className="mt-6 px-5 py-2 bg-green-500 text-white font-semibold focus:ring-2 rounded-md hover:bg-green-600 active:bg-green-700 transition-transform duration-100 ease-in-out active:scale-95"
              aria-label="Pay Now"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
