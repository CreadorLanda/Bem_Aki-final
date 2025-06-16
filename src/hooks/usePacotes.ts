import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function usePacotes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Função para buscar todos os pacotes
  const getPacotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('pacotes')
        .select(`
          *,
          imagens_pacote (*)
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

  // Função para buscar um pacote específico pelo ID
  const getPacoteById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('pacotes')
        .select(`
          *,
          imagens_pacote (*),
          avaliacoes_pacote (
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

  // Função para buscar pacotes por destino
  const getPacotesByDestino = async (destino: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('pacotes')
        .select(`
          *,
          imagens_pacote (*)
        `)
        .ilike('destino', `%${destino}%`)
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

  // Função para buscar pacotes disponíveis (com vagas)
  const getPacotesDisponiveis = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('pacotes')
        .select(`
          *,
          imagens_pacote (*)
        `)
        .gt('vagas_disponiveis', 0)
        .gte('data_inicio', new Date().toISOString().split('T')[0])
        .order('data_inicio');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar pacotes por faixa de preço
  const getPacotesByPreco = async (precoMinimo: number, precoMaximo: number) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('pacotes')
        .select(`
          *,
          imagens_pacote (*)
        `)
        .gte('preco', precoMinimo)
        .lte('preco', precoMaximo)
        .order('preco');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma reserva de pacote
  const criarReservaPacote = async (reserva: any) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar disponibilidade de vagas
      const { data: pacote, error: pacoteError } = await supabase
        .from('pacotes')
        .select('vagas_disponiveis')
        .eq('id', reserva.pacote_id)
        .single();

      if (pacoteError) throw pacoteError;

      if (!pacote || pacote.vagas_disponiveis < reserva.quantidade_pessoas) {
        throw new Error('Não há vagas suficientes disponíveis para este pacote');
      }

      // Criar a reserva
      const { data, error } = await supabase
        .from('reservas_pacote')
        .insert(reserva)
        .select()
        .single();

      if (error) throw error;

      // Atualizar o número de vagas disponíveis
      const { error: updateError } = await supabase
        .from('pacotes')
        .update({
          vagas_disponiveis: pacote.vagas_disponiveis - reserva.quantidade_pessoas
        })
        .eq('id', reserva.pacote_id);

      if (updateError) throw updateError;

      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar uma avaliação de pacote
  const adicionarAvaliacaoPacote = async (avaliacao: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_pacote')
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

  // Função para buscar avaliações de um pacote
  const getAvaliacoesPacote = async (pacoteId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_pacote')
        .select(`
          *,
          usuarios (nome, sobrenome)
        `)
        .eq('pacote_id', pacoteId)
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
    getPacotes,
    getPacoteById,
    getPacotesByDestino,
    getPacotesDisponiveis,
    getPacotesByPreco,
    criarReservaPacote,
    adicionarAvaliacaoPacote,
    getAvaliacoesPacote
  };
} 