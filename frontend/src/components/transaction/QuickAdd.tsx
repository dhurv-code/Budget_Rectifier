"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import CategoryButton from "./CategoryButton";
import AmountInput from "./AmountInput";
import { useTransactions } from "@/context/TransactionContext";

const categories = ["Food", "Transport", "Bills", "Health", "Other",];
export default function QuickAdd() {
  const supabase = createClient();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [loading, setLoading] = useState(false);
  const { addTransaction } = useTransactions();
  const [customCategory, setCustomCategory] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  async function saveTransaction() {
    if (!amount) return;
    try {
      if (category === "Other" && !customCategory.trim()) {
        alert("Please enter a category name.");
        return;
      }

      await addTransaction({
        amount: Number(amount),
        category: category === "Other" ? customCategory : category,
        payment_mode: paymentMode,
        transaction_date: transactionDate,
      });

      setAmount("");
    } catch (error) {
      alert("Unable to save expense");
    }
  }

  return (
    <div className="mt-6 rounded-2xl bg-white p-5 shadow">

      <h2 className="mb-4 text-xl font-bold">
        Quick Add Expense
      </h2>

      <AmountInput
        value={amount}
        onChange={setAmount}
      />

      <div className="mt-5 grid grid-cols-2 gap-3">

        {categories.map((item) => (
          <CategoryButton
            key={item}
            title={item}
            selected={category === item}
            onClick={() => setCategory(item)}
          />
        ))}

      </div>
      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter custom category (e.g. Milk, College Fee)"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="mt-4 w-full rounded-xl border p-3"
        />
      )}

      <select
        className="mt-5 w-full rounded-xl border p-3"
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <option value="cash">Cash</option>
        <option value="upi">UPI</option>
        <option value="card">Card</option>
      </select>
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Date
        </label>

        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        onClick={saveTransaction}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-blue-600 p-4 font-semibold text-black cursor-pointer"
      >
        {loading ? "Saving..." : "Save Expense"}
      </button>

    </div>
  );
}