"use client";

import { useTransactions } from "@/context/TransactionContext";
import { useMonth } from "@/context/MonthContext";

type Transaction = {
  id: string;
  amount: number;
  category: string;
  payment_mode: string;
  transaction_date: string;
};

export default function TransactionList() {
  const {
  transactions,
  loading,
  removeTransaction,
} = useTransactions();
const { selectedMonth } = useMonth();
const filteredTransactions = transactions.filter((transaction) => {
  const date = new Date(transaction.transaction_date);

  return (
    date.getMonth() === selectedMonth.getMonth() &&
    date.getFullYear() === selectedMonth.getFullYear()
  );
});
  

  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Recent Transactions
      </h2>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500">
          No expenses added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-3"
            >
              <div>
                <h3 className="font-semibold">
                  {item.category}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.payment_mode}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ₹{item.amount}
                </p>

                <button
                  onClick={() => removeTransaction(item.id)}
                  className="mt-2 text-sm text-red-500 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}