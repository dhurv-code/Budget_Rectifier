"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface Props {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        if (data.user) {
          await supabase
            .from("profiles")
            .update({ full_name: fullName, })
            .eq("id", data.user.id);
        }
        if (data.user && !data.session) {
          alert("Verification email sent! Please check your inbox before logging in.");
          router.push("/login");
          return;
        }
        if(data.session){
          router.push("/dashboard");
          router.refresh();

        }

        
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password, });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-3xl font-bold">
        {mode === "signup" ? "Create Account" : "Welcome Back"}
      </h1>

      <p className="mb-6 text-gray-500">
        {mode === "signup"
          ? "Start tracking your expenses."
          : "Login to continue."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === "signup" && (
          <AuthInput
            label="Full Name"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        <AuthInput
          label="Email"
          type="email"
          placeholder="abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <AuthButton loading={loading}>
          {mode === "signup" ? "Create Account" : "Login"}
        </AuthButton>
      </form>

      <div className="mt-6 text-center text-sm">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}