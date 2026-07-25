"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();

  const [budget, setBudget] = useState("");

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
      .select("id")
      .eq("user_id", user.id)
      .single();

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

    alert("Budget Updated");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-5">

      <div className="mx-auto max-w-md space-y-5">

        <div className="rounded-xl bg-white p-5 shadow">

          <h1 className="text-2xl font-bold">
            Settings
          </h1>

        </div>

        <div className="rounded-xl bg-white p-5 shadow">

          <label className="font-medium">
            Monthly Budget
          </label>

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-3 w-full rounded-lg border p-3"
          />

          <button
            onClick={saveBudget}
            className="mt-5 w-full rounded-lg bg-blue-600 p-3 text-black"
          >
            Save Budget
          </button>

        </div>

        <button
          onClick={logout}
          className="w-full rounded-lg bg-red-600 p-3 text-black"
        >
          Logout
        </button>

      </div>

    </main>
  );
}