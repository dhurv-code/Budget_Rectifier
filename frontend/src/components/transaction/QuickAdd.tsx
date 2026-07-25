"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

import CategoryButton from "./CategoryButton";
import AmountInput from "./AmountInput";
import { useTransactions } from "@/context/TransactionContext";

const categories = [
  "Food",
  "Transport",
  "Bills",
  "Health",
  "Other",
];

export default function QuickAdd() {
  const supabase = createClient();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [loading, setLoading] = useState(false);
  const { addTransaction } = useTransactions();
  async function saveTransaction() {
  if (!amount) return;

  try {
    await addTransaction({
      amount: Number(amount),
      category,
      payment_mode: paymentMode,
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

      <select
        className="mt-5 w-full rounded-xl border p-3"
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <option value="cash">Cash</option>
        <option value="upi">UPI</option>
        <option value="card">Card</option>
      </select>

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