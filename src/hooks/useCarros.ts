import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useCarros() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Função para buscar todos os carros
  const getCarros = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('carros')
        .select(`
          *,
          imagens_carro (*)
        `)
        .order('marca');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar um carro específico pelo ID
  const getCarroById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('carros')
        .select(`
          *,
          imagens_carro (*),
          avaliacoes_carro (
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

  // Função para buscar carros por tipo
  const getCarrosByTipo = async (tipo: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('carros')
        .select(`
          *,
          imagens_carro (*)
        `)
        .eq('tipo', tipo)
        .order('marca');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar carros disponíveis em um período
  const getCarrosDisponiveis = async (dataRetirada: string, dataDevolucao: string) => {
    try {
      setLoading(true);
      setError(null);

      // Buscar todos os carros
      const { data: carros, error: carrosError } = await supabase
        .from('carros')
        .select(`
          *,
          imagens_carro (*)
        `)
        .eq('disponivel', true)
        .order('preco_diaria');

      if (carrosError) throw carrosError;

      // Buscar reservas existentes para o período
      const { data: reservas, error: reservasError } = await supabase
        .from('reservas_carro')
        .select('carro_id')
        .eq('status', 'confirmada')
        .or(`data_retirada.gte.${dataRetirada},data_devolucao.lte.${dataDevolucao}`)
        .in('carro_id', carros?.map(c => c.id) || []);

      if (reservasError) throw reservasError;

      // Filtrar carros já reservados
      const carrosReservados = reservas?.map(r => r.carro_id) || [];
      const carrosDisponiveis = carros?.filter(carro => !carrosReservados.includes(carro.id)) || [];

      return { data: carrosDisponiveis, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma reserva de carro
  const criarReservaCarro = async (reserva: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_carro')
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

  // Função para adicionar uma avaliação de carro
  const adicionarAvaliacaoCarro = async (avaliacao: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_carro')
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

  // Função para buscar avaliações de um carro
  const getAvaliacoesCarro = async (carroId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_carro')
        .select(`
          *,
          usuarios (nome, sobrenome)
        `)
        .eq('carro_id', carroId)
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
    getCarros,
    getCarroById,
    getCarrosByTipo,
    getCarrosDisponiveis,
    criarReservaCarro,
    adicionarAvaliacaoCarro,
    getAvaliacoesCarro
  };
} 