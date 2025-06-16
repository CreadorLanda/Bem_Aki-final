import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useHoteis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Função para buscar todos os hotéis
  const getHoteis = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('hoteis')
        .select(`
          *,
          imagens_hotel (*)
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

  // Função para buscar um hotel específico pelo ID
  const getHotelById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('hoteis')
        .select(`
          *,
          imagens_hotel (*),
          quartos (
            *,
            imagens_quarto (*)
          ),
          avaliacoes_hotel (
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

  // Função para buscar hotéis por cidade
  const getHoteisByCidade = async (cidade: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('hoteis')
        .select(`
          *,
          imagens_hotel (*)
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

  // Função para buscar quartos disponíveis em um hotel
  const getQuartosDisponiveis = async (hotelId: string, dataCheckin: string, dataCheckout: string, quantidadeHospedes: number) => {
    try {
      setLoading(true);
      setError(null);

      // Buscar todos os quartos do hotel
      const { data: quartos, error: quartosError } = await supabase
        .from('quartos')
        .select(`
          *,
          imagens_quarto (*)
        `)
        .eq('hotel_id', hotelId)
        .gte('capacidade', quantidadeHospedes)
        .order('preco_noite');

      if (quartosError) throw quartosError;

      // Buscar reservas existentes para o período
      const { data: reservas, error: reservasError } = await supabase
        .from('reservas_hotel')
        .select('quarto_id, quantidade_hospedes')
        .eq('status', 'confirmada')
        .or(`data_checkin.gte.${dataCheckin},data_checkout.lte.${dataCheckout}`)
        .in('quarto_id', quartos?.map(q => q.id) || []);

      if (reservasError) throw reservasError;

      // Calcular disponibilidade real de cada quarto
      const quartosDisponiveis = quartos?.map(quarto => {
        const reservasDoQuarto = reservas?.filter(r => r.quarto_id === quarto.id) || [];
        const ocupados = reservasDoQuarto.length;
        const disponibilidadeReal = quarto.quantidade_disponivel - ocupados;
        
        return {
          ...quarto,
          disponibilidade_real: disponibilidadeReal > 0 ? disponibilidadeReal : 0
        };
      }).filter(quarto => quarto.disponibilidade_real > 0) || [];

      return { data: quartosDisponiveis, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma reserva de hotel
  const criarReservaHotel = async (reserva: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_hotel')
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

  // Função para adicionar uma avaliação de hotel
  const adicionarAvaliacaoHotel = async (avaliacao: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_hotel')
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

  // Função para buscar avaliações de um hotel
  const getAvaliacoesHotel = async (hotelId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('avaliacoes_hotel')
        .select(`
          *,
          usuarios (nome, sobrenome)
        `)
        .eq('hotel_id', hotelId)
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
    getHoteis,
    getHotelById,
    getHoteisByCidade,
    getQuartosDisponiveis,
    criarReservaHotel,
    adicionarAvaliacaoHotel,
    getAvaliacoesHotel
  };
} 