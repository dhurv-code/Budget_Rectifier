"use client";

import { useTransactions } from "@/context/TransactionContext";

export default function DashboardStats() {
  const { transactions } = useTransactions();

  const today = new Date();

  let todaySpend = 0;
  let monthSpend = 0;

  transactions.forEach((t) => {
    const date = new Date(t.transaction_date);

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      todaySpend += Number(t.amount);
    }

    if (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      monthSpend += Number(t.amount);
    }
  });

  return (
    <div className="grid grid-cols-2 gap-4">

      <div className="rounded-xl bg-blue-600 p-5 text-white">
        <p className="text-sm">Today</p>
        <h2 className="text-3xl font-bold mt-2">
          ₹{todaySpend}
        </h2>
      </div>

      <div className="rounded-xl bg-green-600 p-5 text-white">
        <p className="text-sm">This Month</p>
        <h2 className="text-3xl font-bold mt-2">
          ₹{monthSpend}
        </h2>
      </div>

    </div>
  );
}