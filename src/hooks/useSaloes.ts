import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useSaloes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Função para buscar todos os salões
  const getSaloes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('saloes')
        .select(`
          *,
          imagens_salao (*)
        `)
        .order('nome');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar um salão específico pelo ID
  const getSalaoById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('saloes')
        .select(`
          *,
          imagens_salao (*),
          avaliacoes_salao (
            *,
            usuarios (nome, sobrenome)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar salões por cidade
  const getSaloesByCidade = async (cidade: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('saloes')
        .select(`
          *,
          imagens_salao (*)
        `)
        .ilike('cidade', `%${cidade}%`)
        .order('nome');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar salões por capacidade
  const getSaloesByCapacidade = async (capacidadeMinima: number) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('saloes')
        .select(`
          *,
          imagens_salao (*)
        `)
        .gte('capacidade', capacidadeMinima)
        .order('capacidade');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar disponibilidade de um salão em um período
  const verificarDisponibilidadeSalao = async (salaoId: string, dataInicio: string, dataFim: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_salao')
        .select('*')
        .eq('salao_id', salaoId)
        .eq('status', 'confirmada')
        .or(`data_inicio.lte.${dataFim},data_fim.gte.${dataInicio}`);

      if (error) throw error;
      
      // Se não houver reservas no período, o salão está disponível
      const disponivel = data.length === 0;
      
      return { disponivel, error: null };
    } catch (err) {
      setError(err);
      return { disponivel: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma reserva de salão
  const criarReservaSalao = async (reserva: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_salao')
        .insert(reserva)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar uma avaliação de salão
  const adicionarAvaliacaoSalao = async (avaliacao: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_salao')
        .insert(avaliacao)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar avaliações de um salão
  const getAvaliacoesSalao = async (salaoId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_salao')
        .select(`
          *,
          usuarios (nome, sobrenome)
        `)
        .eq('salao_id', salaoId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getSaloes,
    getSalaoById,
    getSaloesByCidade,
    getSaloesByCapacidade,
    verificarDisponibilidadeSalao,
    criarReservaSalao,
    adicionarAvaliacaoSalao,
    getAvaliacoesSalao
  };
} 