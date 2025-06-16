import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSupabaseAuth } from './useSupabaseAuth';

export function useReservas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useSupabaseAuth();

  // Função para buscar todas as reservas de hotel do usuário
  const getReservasHotel = async () => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      console.log("Buscando reservas de hotel para usuário:", user.id);

      const { data, error } = await supabase
        .from('reservas_hotel')
        .select(`
          *,
          quarto: quartos (
            *,
            hotel: hoteis (
              id,
              nome,
              endereco,
              cidade
            )
          )
        `)
        .eq('usuario_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Reservas de hotel obtidas:", data?.length || 0);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar reservas de hotel:", err);
      return { data: null, error: err };
    }
  };

  // Função para buscar todas as reservas de carro do usuário
  const getReservasCarro = async () => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      console.log("Buscando reservas de carro para usuário:", user.id);

      const { data, error } = await supabase
        .from('reservas_carro')
        .select(`
          *,
          carro: carros (
            *,
            imagens_carro (*)
          )
        `)
        .eq('usuario_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Reservas de carro obtidas:", data?.length || 0);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar reservas de carro:", err);
      return { data: null, error: err };
    }
  };

  // Função para buscar todas as reservas de salão do usuário
  const getReservasSalao = async () => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      console.log("Buscando reservas de salão para usuário:", user.id);

      const { data, error } = await supabase
        .from('reservas_salao')
        .select(`
          *,
          salao: saloes (
            *,
            imagens_salao (*)
          )
        `)
        .eq('usuario_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Reservas de salão obtidas:", data?.length || 0);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar reservas de salão:", err);
      return { data: null, error: err };
    }
  };

  // Função para buscar todas as reservas de pacote do usuário
  const getReservasPacote = async () => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      console.log("Buscando reservas de pacote para usuário:", user.id);

      const { data, error } = await supabase
        .from('reservas_pacote')
        .select(`
          *,
          pacote: pacotes (
            *,
            imagens_pacote (*)
          )
        `)
        .eq('usuario_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Reservas de pacote obtidas:", data?.length || 0);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar reservas de pacote:", err);
      return { data: null, error: err };
    }
  };

  // Função auxiliar para verificar autenticação
  const verificarAutenticacao = () => {
    if (!user) return { autenticado: false, erro: 'Usuário não autenticado' };
    if (!user.id) return { autenticado: false, erro: 'ID do usuário não disponível' };
    return { autenticado: true, erro: null };
  };

  // Função para buscar todas as reservas do usuário (de todos os tipos)
  const getAllReservas = async () => {
    const { autenticado, erro } = verificarAutenticacao();
    if (!autenticado) return { data: null, error: erro };
    
    try {
      console.log("Iniciando busca de todas as reservas para usuário:", user.id);
      setLoading(true);
      setError(null);

      // Usar Promise.allSettled para evitar que uma falha em uma consulta afete as outras
      const results = await Promise.allSettled([
        getReservasHotel(),
        getReservasCarro(),
        getReservasSalao(),
        getReservasPacote()
      ]);
      
      // Processar os resultados
      const allReservas = {
        hotel: [],
        carro: [],
        salao: [],
        pacote: []
      };
      
      // Verificar cada resultado
      if (results[0].status === 'fulfilled' && results[0].value.data) {
        allReservas.hotel = results[0].value.data;
      } else if (results[0].status === 'rejected') {
        console.error("Falha ao buscar reservas de hotel:", results[0].reason);
      }
      
      if (results[1].status === 'fulfilled' && results[1].value.data) {
        allReservas.carro = results[1].value.data;
      } else if (results[1].status === 'rejected') {
        console.error("Falha ao buscar reservas de carro:", results[1].reason);
      }
      
      if (results[2].status === 'fulfilled' && results[2].value.data) {
        allReservas.salao = results[2].value.data;
      } else if (results[2].status === 'rejected') {
        console.error("Falha ao buscar reservas de salão:", results[2].reason);
      }
      
      if (results[3].status === 'fulfilled' && results[3].value.data) {
        allReservas.pacote = results[3].value.data;
      } else if (results[3].status === 'rejected') {
        console.error("Falha ao buscar reservas de pacote:", results[3].reason);
      }

      console.log("Todas as reservas processadas:", {
        hotel: allReservas.hotel.length,
        carro: allReservas.carro.length,
        salao: allReservas.salao.length,
        pacote: allReservas.pacote.length
      });

      return { data: allReservas, error: null };
    } catch (err) {
      console.error("Erro ao buscar todas as reservas:", err);
      setError(err as Error);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma reserva de hotel
  const criarReservaHotel = async (reserva: {
    usuario_id: string;
    quarto_id: string;
    data_checkin: string;
    data_checkout: string;
    preco_total: number;
    quantidade_hospedes: number;
    status: string;
  }) => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      setLoading(true);
      setError(null);

      console.log("Criando nova reserva de hotel:", reserva);

      const { data, error } = await supabase
        .from('reservas_hotel')
        .insert(reserva)
        .select()
        .single();

      if (error) throw error;
      console.log("Reserva de hotel criada com sucesso:", data);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao criar reserva de hotel:", err);
      setError(err as Error);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma reserva de carro
  const criarReservaCarro = async (reserva: {
    usuario_id: string;
    carro_id: string;
    data_retirada: string;
    data_devolucao: string;
    preco_total: number;
    status: string;
   
  }) => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      setLoading(true);
      setError(null);

      console.log("Criando nova reserva de carro:", reserva);

      const { data, error } = await supabase
        .from('reservas_carro')
        .insert(reserva)
        .select()
        .single();

      if (error) throw error;
      console.log("Reserva de carro criada com sucesso:", data);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao criar reserva de carro:", err);
      setError(err as Error);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar uma reserva de hotel
  const cancelarReservaHotel = async (reservaId: string) => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_hotel')
        .update({ status: 'cancelada' })
        .eq('id', reservaId)
        .eq('usuario_id', user.id)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao cancelar reserva de hotel:", err);
      setError(err as Error);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar uma reserva de carro
  const cancelarReservaCarro = async (reservaId: string) => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_carro')
        .update({ status: 'cancelada' })
        .eq('id', reservaId)
        .eq('usuario_id', user.id)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao cancelar reserva de carro:", err);
      setError(err as Error);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar uma reserva de salão
  const cancelarReservaSalao = async (reservaId: string) => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_salao')
        .update({ status: 'cancelada' })
        .eq('id', reservaId)
        .eq('usuario_id', user.id)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao cancelar reserva de salão:", err);
      setError(err as Error);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar uma reserva de pacote
  const cancelarReservaPacote = async (reservaId: string) => {
    if (!user) return { data: null, error: 'Usuário não autenticado' };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('reservas_pacote')
        .update({ status: 'cancelada' })
        .eq('id', reservaId)
        .eq('usuario_id', user.id)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao cancelar reserva de pacote:", err);
      setError(err as Error);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getReservasHotel,
    getReservasCarro,
    getReservasSalao,
    getReservasPacote,
    getAllReservas,
    criarReservaHotel,
    criarReservaCarro,
    cancelarReservaHotel,
    cancelarReservaCarro,
    cancelarReservaSalao,
    cancelarReservaPacote
  };
} 