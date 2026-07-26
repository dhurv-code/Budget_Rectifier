import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getTransactions() {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createTransaction(data: {
  amount: number;
  category: string;
  payment_mode: string;
  transaction_date: string;
  
}) {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not logged in");

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    amount: data.amount,
    category: data.category,
    payment_mode: data.payment_mode,
    transaction_date: data.transaction_date,
  });

  if (error) throw error;
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}