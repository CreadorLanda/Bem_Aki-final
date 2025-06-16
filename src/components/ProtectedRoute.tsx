import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedUserTypes: string[];
  redirectTo?: string;
};

export default function ProtectedRoute({ 
  children, 
  allowedUserTypes, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading, getUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserType = async () => {
      if (user && !loading) {
        const { data: profile, error } = await getUserProfile();
        
        if (error) {
          console.error('Erro ao obter perfil do usuário:', error);
          navigate('/login');
          return;
        }

        if (profile && !allowedUserTypes.includes(profile.tipo_usuario)) {
          // Redirecionar para o painel apropriado com base no tipo de usuário
          switch (profile.tipo_usuario) {
            case 'admin':
              navigate('/admin');
              break;
            case 'gerente_hotel':
            case 'hotel':
              navigate('/hotel-dashboard');
              break;
            case 'gerente_carro':
              navigate('/carro-dashboard');
              break;
            case 'gerente_salao':
              navigate('/salao-dashboard');
              break;
            case 'cliente':
              navigate('/minha-conta');
              break;
            default:
              navigate('/');
              break;
          }
        }
      }
    };

    if (!loading) {
      checkUserType();
    }
  }, [user, loading, allowedUserTypes, getUserProfile, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
