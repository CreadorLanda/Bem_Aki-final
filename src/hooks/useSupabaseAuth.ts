import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obter a sessão atual
    const getSession = async () => {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Erro ao obter sessão:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Limpar subscription quando o componente for desmontado
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Função para login com email e senha
  const loginWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Função para registro com email e senha
  const registerWithEmail = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      console.log("Iniciando processo de registro para:", email, "com dados:", userData);
      
      // Método 1: Registrar o usuário diretamente com o Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/login',
          data: {
            nome: userData.nome,
            sobrenome: userData.sobrenome
          }
        }
      });

      console.log("Resposta do signUp:", data, error);

      if (error) {
        console.error("Erro no signUp:", error);
        return { data: null, error };
      }
      
      // Se o registro foi bem-sucedido e temos um ID de usuário
      if (data.user?.id) {
        console.log("Usuário criado com ID:", data.user.id);
        
        try {
          // Método 2: Inserir dados na tabela usuarios usando função RPC personalizada
          // Esta é uma alternativa que pode contornar problemas de permissão
          const { data: insertData, error: rpcError } = await supabase.rpc('criar_usuario', {
            user_id: data.user.id,
            user_email: email,
            user_nome: userData.nome,
            user_sobrenome: userData.sobrenome,
            user_telefone: userData.telefone || null,
            user_data_nascimento: userData.dataNascimento || null,
            user_cpf: userData.cpf || null
          });
          
          if (rpcError) {
            console.error("Erro ao chamar função RPC:", rpcError);
            
            // Método 3: Tentativa direta de inserção como fallback
            console.log("Tentando inserção direta na tabela usuarios");
            const { error: insertError } = await supabase
              .from('usuarios')
              .insert({
                id: data.user.id,
                email: email,
                nome: userData.nome,
                sobrenome: userData.sobrenome,
                telefone: userData.telefone || null,
                data_nascimento: userData.dataNascimento || null,
                cpf: userData.cpf || null,
                tipo_usuario: 'cliente',
                created_at: new Date().toISOString()
              });
              
            if (insertError) {
              console.error("Erro na inserção direta:", insertError);
              return { 
                data, 
                error: { 
                  message: "Conta criada, mas houve um erro ao salvar seus dados. Por favor, atualize seu perfil após o login." 
                } 
              };
            }
          }
          
          console.log("Dados do usuário inseridos com sucesso");
          return { data, error: null };
        } catch (insertError) {
          console.error("Exceção ao inserir dados:", insertError);
          return { 
            data, 
            error: { 
              message: "Conta criada, mas houve um erro ao salvar seus dados. Por favor, atualize seu perfil após o login." 
            } 
          };
        }
      } else {
        console.log("Usuário criado mas sem ID:", data);
        return { data, error: { message: "Usuário criado sem ID" } };
      }
    } catch (error) {
      console.error("Erro capturado no registerWithEmail:", error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Função para obter os dados completos do usuário da tabela usuarios
  const getUserProfile = async () => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Função para atualizar os dados do usuário
  const updateUserProfile = async (userData: any) => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    user,
    session,
    loading,
    loginWithEmail,
    registerWithEmail,
    logout,
    getUserProfile,
    updateUserProfile
  };
} 