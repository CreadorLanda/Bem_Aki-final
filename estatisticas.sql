-- Script para criar a tabela de estatísticas

-- Criar tabela de estatísticas
CREATE TABLE IF NOT EXISTS public.estatisticas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_hoteis INTEGER DEFAULT 0,
  total_quartos INTEGER DEFAULT 0,
  total_carros INTEGER DEFAULT 0,
  total_saloes INTEGER DEFAULT 0,
  total_pacotes INTEGER DEFAULT 0,
  total_usuarios INTEGER DEFAULT 0,
  total_reservas_hotel INTEGER DEFAULT 0,
  total_reservas_carro INTEGER DEFAULT 0,
  total_reservas_salao INTEGER DEFAULT 0,
  total_reservas_pacote INTEGER DEFAULT 0,
  avaliacao_media_hoteis NUMERIC(3,1) DEFAULT 0,
  avaliacao_media_carros NUMERIC(3,1) DEFAULT 0,
  avaliacao_media_saloes NUMERIC(3,1) DEFAULT 0,
  avaliacao_media_pacotes NUMERIC(3,1) DEFAULT 0,
  destino_mais_popular TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar comentários à tabela e colunas
COMMENT ON TABLE public.estatisticas IS 'Estatísticas gerais do sistema AKI Viagens Afrika';
COMMENT ON COLUMN public.estatisticas.id IS 'ID único do registro de estatísticas';
COMMENT ON COLUMN public.estatisticas.total_hoteis IS 'Total de hotéis cadastrados';
COMMENT ON COLUMN public.estatisticas.total_quartos IS 'Total de quartos cadastrados';
COMMENT ON COLUMN public.estatisticas.total_carros IS 'Total de carros cadastrados';
COMMENT ON COLUMN public.estatisticas.total_saloes IS 'Total de salões cadastrados';
COMMENT ON COLUMN public.estatisticas.total_pacotes IS 'Total de pacotes cadastrados';
COMMENT ON COLUMN public.estatisticas.total_usuarios IS 'Total de usuários cadastrados';
COMMENT ON COLUMN public.estatisticas.total_reservas_hotel IS 'Total de reservas de hotel realizadas';
COMMENT ON COLUMN public.estatisticas.total_reservas_carro IS 'Total de reservas de carro realizadas';
COMMENT ON COLUMN public.estatisticas.total_reservas_salao IS 'Total de reservas de salão realizadas';
COMMENT ON COLUMN public.estatisticas.total_reservas_pacote IS 'Total de reservas de pacote realizadas';
COMMENT ON COLUMN public.estatisticas.avaliacao_media_hoteis IS 'Avaliação média dos hotéis';
COMMENT ON COLUMN public.estatisticas.avaliacao_media_carros IS 'Avaliação média dos carros';
COMMENT ON COLUMN public.estatisticas.avaliacao_media_saloes IS 'Avaliação média dos salões';
COMMENT ON COLUMN public.estatisticas.avaliacao_media_pacotes IS 'Avaliação média dos pacotes';
COMMENT ON COLUMN public.estatisticas.destino_mais_popular IS 'Destino mais popular entre as reservas';
COMMENT ON COLUMN public.estatisticas.updated_at IS 'Data da última atualização das estatísticas';

-- Configurar RLS (Row Level Security)
ALTER TABLE public.estatisticas ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Estatísticas visíveis para todos" 
  ON public.estatisticas FOR SELECT 
  USING (true);

CREATE POLICY "Apenas admins podem modificar estatísticas" 
  ON public.estatisticas 
  USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'admin'
    )
  );

-- Inserir dados iniciais
INSERT INTO public.estatisticas (
  id, 
  total_hoteis, 
  total_quartos,
  total_carros,
  total_saloes,
  total_pacotes,
  avaliacao_media_hoteis,
  avaliacao_media_carros,
  avaliacao_media_saloes,
  avaliacao_media_pacotes,
  destino_mais_popular
)
VALUES (
  gen_random_uuid(),
  (SELECT COUNT(*) FROM public.hoteis),
  (SELECT COUNT(*) FROM public.quartos),
  (SELECT COUNT(*) FROM public.carros),
  (SELECT COUNT(*) FROM public.saloes),
  (SELECT COUNT(*) FROM public.pacotes),
  (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.hoteis),
  (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.carros),
  (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.saloes),
  (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.pacotes),
  'Luanda'
);

-- Criar função para atualizar estatísticas
CREATE OR REPLACE FUNCTION update_estatisticas()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.estatisticas
  SET 
    total_hoteis = (SELECT COUNT(*) FROM public.hoteis),
    total_quartos = (SELECT COUNT(*) FROM public.quartos),
    total_carros = (SELECT COUNT(*) FROM public.carros),
    total_saloes = (SELECT COUNT(*) FROM public.saloes),
    total_pacotes = (SELECT COUNT(*) FROM public.pacotes),
    total_usuarios = (SELECT COUNT(*) FROM public.usuarios),
    total_reservas_hotel = (SELECT COUNT(*) FROM public.reservas_hotel),
    total_reservas_carro = (SELECT COUNT(*) FROM public.reservas_carro),
    total_reservas_salao = (SELECT COUNT(*) FROM public.reservas_salao),
    total_reservas_pacote = (SELECT COUNT(*) FROM public.reservas_pacote),
    avaliacao_media_hoteis = (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.hoteis),
    avaliacao_media_carros = (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.carros),
    avaliacao_media_saloes = (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.saloes),
    avaliacao_media_pacotes = (SELECT COALESCE(AVG(avaliacao_media), 0) FROM public.pacotes),
    updated_at = NOW();
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql; 