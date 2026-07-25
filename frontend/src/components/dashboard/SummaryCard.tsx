"use client";

import { useTransactions } from "@/context/TransactionContext";

export default function SummaryCard() {
  const { transactions } = useTransactions();

  const now = new Date();

  const totalMonth = transactions
    .filter((t) => {
      const d = new Date(t.transaction_date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalToday = transactions
    .filter((t) => {
      const d = new Date(t.transaction_date);

      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl bg-blue-600 p-5 text-white shadow">
        <p className="text-sm">Today's Spend</p>
        <h2 className="mt-2 text-3xl font-bold">₹{totalToday}</h2>
      </div>

      <div className="rounded-xl bg-green-600 p-5 text-white shadow">
        <p className="text-sm">This Month</p>
        <h2 className="mt-2 text-3xl font-bold">₹{totalMonth}</h2>
      </div>
    </div>
  );
}