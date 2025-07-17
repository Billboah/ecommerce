/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../context";
import { addOrder } from "@/util/order";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Checkout() {
  const { cart } = useCart();
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      alert("Your cart is empty. Redirecting to cart...");
      router.replace("/cart");
    }
  }, []);

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }
    addOrder(cart);

    // Simulate success
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product List */}
        <div className="md:w-1/2 p-4 ">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 bg-white p-3 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="object-contain rounded-md"
                    style={{ height: "60px" }}
                  />
                  <div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-gray-600 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right font-semibold text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-6 text-lg font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>

        {/* Payment Section */}
        <div className="md:w-1/2 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          <div className="flex gap-2 mb-4">
            {["card", "bank", "mobile"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`px-4 py-2 rounded-md text-left ${
                  paymentMethod === method
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-white border border-gray-300"
                }`}
              >
                {method === "card" && "Pay with Card"}
                {method === "bank" && "Bank Transfer"}
                {method === "mobile" && "Mobile Money"}
              </button>
            ))}
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Card Number"
              />
              <div className="flex gap-2">
                <input
                  className="w-1/2 border p-2 rounded"
                  placeholder="MM / YY"
                />
                <input className="w-1/2 border p-2 rounded" placeholder="CVV" />
              </div>
              <input
                className="w-full border p-2 rounded"
                placeholder="Cardholder Name"
              />
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Transfer to: 123456789 - GTBank
              </p>
              <input
                className="w-full border p-2 rounded"
                placeholder="Reference ID"
              />
            </div>
          )}

          {paymentMethod === "mobile" && (
            <div className="space-y-3">
              <select className="w-full border p-2 rounded">
                <option>Select Network</option>
                <option>MTN</option>
                <option>Vodafone</option>
                <option>AirtelTigo</option>
              </select>
              <input
                className="w-full border p-2 rounded"
                placeholder="Mobile Number"
              />
            </div>
          )}

          <button
            onClick={handlePayment}
            className="mt-6 w-full py-3 bg-green-500 text-white font-semibold focus:ring-2 rounded-md hover:bg-green-600 active:bg-green-700 transition-transform duration-100 ease-in-out active:scale-95"
            aria-label="Pay Now"
            disabled={cart.length === 0}
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center max-w-xs w-full shadow-lg">
            <h2 className="text-lg font-bold text-green-600 mb-4">
              Payment Successful!
            </h2>
            <p className="text-sm mb-6">Thank you for your purchase.</p>
            <div className="flex justify-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => {
                  clearCart();
                  setShowSuccess(false);
                }}
                aria-label="Go to Home"
              >
                Home
              </Link>
              <Link
                href="/orders"
                className="px-4 py-2 bg-gray-700 text-white rounded-md"
                onClick={() => {
                  clearCart();
                  setShowSuccess(false);
                }}
                aria-label="View Orders"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
