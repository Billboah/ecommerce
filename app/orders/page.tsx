"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProductWithQuantity = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

type OrderHistoryItem = {
  id: string;
  date: string;
  items: ProductWithQuantity[];
  total: number;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<OrderHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("orderHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const clearHistory = () => {
    const confirmed = window.confirm("Clear all order history?");
    if (confirmed) {
      localStorage.removeItem("orderHistory");
      setHistory([]);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-gray-600">You have no order history yet.</p>
      ) : (
        <ul className="space-y-6">
          {history.map((order) => (
            <li key={order.id} className="border rounded p-4 shadow bg-white">
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>
                  Order ID: <code className="text-gray-800">{order.id}</code>
                </span>
                <span>{new Date(order.date).toLocaleString()}</span>
              </div>
              <ul className="divide-y mt-2">
                {order.items.map((item) => (
                  <li key={item.id} className="py-2 flex justify-between">
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
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-blue-600 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-right font-bold text-blue-700">
                Total: ${order.total.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
