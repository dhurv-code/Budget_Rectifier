"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function GoalCard() {
  const supabase = createClient();

  const [goal, setGoal] = useState<any>(null);

  useEffect(() => {
    loadGoal();
  }, []);

  async function loadGoal() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (data) setGoal(data);
  }

  if (!goal) {
    return (
      <div className="rounded-xl bg-white p-5 shadow">
        <h2 className="font-bold">Savings Goal</h2>

        <p className="mt-2 text-gray-500">
          No goal created yet.
        </p>
      </div>
    );
  }

  const progress =
    (goal.current_amount / goal.target_amount) * 100;

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="font-bold">{goal.title}</h2>

      <p className="mt-2">
        ₹{goal.current_amount} / ₹{goal.target_amount}
      </p>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-green-600"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}