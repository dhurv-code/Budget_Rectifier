"use client";

import { useTransactions } from "@/context/TransactionContext";
import { useMonth } from "@/context/MonthContext";
export default function DashboardStats() {
  const { transactions } = useTransactions();
  const { selectedMonth } = useMonth();
  const today = new Date();

  let todaySpend = 0;
  let monthSpend = 0;

  const monthTransactions = transactions.filter((transaction) => {
  const date = new Date(transaction.transaction_date);
  return (
    date.getMonth() === selectedMonth.getMonth() &&
    date.getFullYear() === selectedMonth.getFullYear()
  );
});
  monthTransactions.forEach((t) => {
    const date = new Date(t.transaction_date);
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      todaySpend += Number(t.amount);
    }
    if (
      date.getMonth() === selectedMonth.getMonth() &&
      date.getFullYear() === selectedMonth.getFullYear()
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