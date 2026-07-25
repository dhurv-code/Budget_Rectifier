import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <AuthForm mode="signup" />
    </main>
  );
}