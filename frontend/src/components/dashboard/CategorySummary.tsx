"use client";

import { useTransactions } from "@/context/TransactionContext";

export default function CategorySummary() {

  const { transactions } = useTransactions();

  const totals: Record<string, number> = {};

  transactions.forEach((t) => {
    totals[t.category] =
      (totals[t.category] || 0) + Number(t.amount);
  });

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="font-bold text-lg mb-4">
        Category Spending
      </h2>

      {Object.entries(totals).map(([category, amount]) => (

        <div
          key={category}
          className="flex justify-between border-b py-2"
        >
          <span>{category}</span>

          <span className="font-semibold">
            ₹{amount}
          </span>

        </div>

      ))}

    </div>
  );
}