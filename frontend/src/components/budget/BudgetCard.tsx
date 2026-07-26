"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useTransactions } from "@/context/TransactionContext";
import { useMonth } from "@/context/MonthContext";

export default function BudgetCard() {
  const supabase = createClient();
  const { transactions } = useTransactions();
  const { selectedMonth } = useMonth();

  const [budget, setBudget] = useState("");
  const [editing, setEditing] = useState(false);


  const monthTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.transaction_date);

    return (
      date.getMonth() === selectedMonth.getMonth() &&
      date.getFullYear() === selectedMonth.getFullYear()
    );
  });


  useEffect(() => {
    loadBudget();
  }, []);

  async function loadBudget() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (data) {
    setBudget(String(data.monthly_limit));
  }
}

async function saveBudget() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (data) {
    setBudget(String(data.monthly_limit));
  }

  if (data) {
    await supabase
      .from("budgets")
      .update({
        monthly_limit: Number(budget),
      })
      .eq("id", data.id);
  } else {
    await supabase
      .from("budgets")
      .insert({
        user_id: user.id,
        monthly_limit: Number(budget),
      });
  }

  setEditing(false);
}

const spent = monthTransactions.reduce(
  (sum, t) => sum + Number(t.amount),
  0
);

const remaining = Math.max(0, Number(budget) - spent);

const percentage =
  Number(budget) === 0
    ? 0
    : Math.min((spent / Number(budget)) * 100, 100);

return (
  <div className="rounded-xl bg-white p-5 shadow">

    <div className="flex items-center justify-between">

      <h2 className="text-lg font-bold">
        Monthly Budget
      </h2>

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="text-blue-600"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={saveBudget}
          className="text-green-600"
        >
          Save
        </button>
      )}

    </div>

    {editing ? (
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="mt-4 w-full rounded-lg border p-3"
      />
    ) : (
      <h1 className="mt-4 text-3xl font-bold">
        ₹{budget || 0}
      </h1>
    )}

    <div className="mt-5 h-3 rounded-full bg-gray-200">

      <div
        className="h-3 rounded-full bg-blue-600"
        style={{
          width: `${percentage}%`,
        }}
      />

    </div>

    <div className="mt-4 flex justify-between text-sm">

      <span>
        Spent ₹{spent}
      </span>

      <span>
        Left ₹{remaining}
      </span>

    </div>

  </div>
);
}