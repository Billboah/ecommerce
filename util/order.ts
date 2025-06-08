import { v4 as uuidv4 } from "uuid";

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

export const addOrder = (items: ProductWithQuantity[]) => {
  const historyKey = "orderHistory";
  const existing: OrderHistoryItem[] = JSON.parse(
    localStorage.getItem(historyKey) || "[]"
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const newOrder: OrderHistoryItem = {
    id: uuidv4(),
    date: new Date().toISOString(),
    items,
    total,
  };

  const updatedHistory = [newOrder, ...existing];
  localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
};
