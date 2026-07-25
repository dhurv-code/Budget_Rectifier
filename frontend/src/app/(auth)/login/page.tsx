import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <AuthForm mode="login" />
    </main>
  );
}