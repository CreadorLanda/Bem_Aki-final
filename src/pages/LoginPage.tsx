import { LoginForm } from "@/components/LoginForm";
import { MainLayout } from "@/components/layouts/MainLayout";

export function LoginPage() {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
} 