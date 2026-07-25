"use client";

import { useTransactions } from "@/context/TransactionContext";
import { generateSuggestions } from "@/lib/rectifierRules";

export default function RectifierCard() {
  const { transactions } = useTransactions();

  const suggestions = generateSuggestions(transactions);

  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Budget Rectifier
      </h2>

      {suggestions.length === 0 ? (
        <p className="text-gray-500">
          Keep adding expenses. We'll suggest savings once we have enough data.
        </p>
      ) : (
        <div className="space-y-4">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border bg-yellow-50 p-4"
            >
              <h3 className="font-semibold">{item.title}</h3>

              <p className="mt-1 text-sm text-gray-700">
                {item.message}
              </p>

              <p className="mt-2 font-bold text-green-600">
                Potential Saving: ₹{item.savings.toFixed(0)}/month
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Pattern-based guidance only. Not financial advice.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}