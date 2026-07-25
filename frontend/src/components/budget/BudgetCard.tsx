"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useTransactions } from "@/context/TransactionContext";

export default function BudgetCard() {
  const supabase = createClient();
  const { transactions } = useTransactions();

  const [budget, setBudget] = useState(0);

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
      .limit(1)
      .single();

    if (data) {
      setBudget(Number(data.monthly_limit));
    }
  }

  const spent = transactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  const remaining = Math.max(0, budget - spent);

  const percentage =
    budget === 0 ? 0 : Math.min((spent / budget) * 100, 100);

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <div className="flex justify-between">

        <h2 className="font-bold">
          Monthly Budget
        </h2>

        <span>₹{budget}</span>

      </div>

      <div className="mt-4 h-3 rounded-full bg-gray-200">

        <div
          className="h-3 rounded-full bg-green-600"
          style={{ width: `${percentage}%` }}
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