import { createContext, useContext, ReactNode } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<{
    data: any;
    error: any;
  }>;
  registerWithEmail: (
    email: string,
    password: string,
    userData: any
  ) => Promise<{
    data: any;
    error: any;
  }>;
  logout: () => Promise<{
    error: any;
  }>;
  getUserProfile: () => Promise<{
    data: any;
    error: any;
  }>;
  updateUserProfile: (userData: any) => Promise<{
    data: any;
    error: any;
  }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useSupabaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 