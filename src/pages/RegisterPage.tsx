import { RegisterForm } from "@/components/RegisterForm";
import { MainLayout } from "@/components/layouts/MainLayout";

export function RegisterPage() {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Criar Conta</h1>
          <RegisterForm />
        </div>
      </div>
    </MainLayout>
  );
} 