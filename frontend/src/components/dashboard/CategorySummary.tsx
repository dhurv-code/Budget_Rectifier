"use client";

import { useTransactions } from "@/context/TransactionContext";
import { useMonth } from "@/context/MonthContext";

export default function CategorySummary() {

  const { transactions } = useTransactions();
  const {selectedMonth}=useMonth();

  const totals: Record<string, number> = {};

  const monthTransactions = transactions.filter((transaction) => {
  const date = new Date(transaction.transaction_date);

  return (
    date.getMonth() === selectedMonth.getMonth() &&
    date.getFullYear() === selectedMonth.getFullYear()
  );
});

  monthTransactions.forEach((t) => {
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