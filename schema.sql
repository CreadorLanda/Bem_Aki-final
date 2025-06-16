-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela de usuários (gerenciada pelo Supabase Auth, mas com dados adicionais)
CREATE TABLE IF NOT EXISTS public.usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  telefone TEXT,
  data_nascimento DATE,
  cpf TEXT,
  tipo_usuario TEXT DEFAULT 'cliente' CHECK (tipo_usuario IN ('cliente', 'admin', 'gerente_hotel', 'gerente_carro', 'gerente_salao')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de hotéis
CREATE TABLE IF NOT EXISTS public.hoteis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  descricao TEXT,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estrelas INTEGER CHECK (estrelas BETWEEN 1 AND 5),
  preco_minimo NUMERIC(10, 2) NOT NULL,
  tem_wifi BOOLEAN DEFAULT FALSE,
  tem_piscina BOOLEAN DEFAULT FALSE,
  tem_restaurante BOOLEAN DEFAULT FALSE,
  tem_estacionamento BOOLEAN DEFAULT FALSE,
  tem_academia BOOLEAN DEFAULT FALSE,
  avaliacao_media NUMERIC(3, 2),
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  gerente_id UUID REFERENCES public.usuarios(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de imagens de hotéis
CREATE TABLE IF NOT EXISTS public.imagens_hotel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES public.hoteis(id) ON DELETE CASCADE,
  caminho_arquivo TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de quartos
CREATE TABLE IF NOT EXISTS public.quartos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES public.hoteis(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco_noite NUMERIC(10, 2) NOT NULL,
  capacidade INTEGER NOT NULL,
  quantidade_disponivel INTEGER NOT NULL,
  tipo_cama TEXT NOT NULL,
  tamanho_m2 INTEGER,
  tem_ar_condicionado BOOLEAN DEFAULT FALSE,
  tem_tv BOOLEAN DEFAULT FALSE,
  tem_frigobar BOOLEAN DEFAULT FALSE,
  tem_cofre BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de imagens de quartos
CREATE TABLE IF NOT EXISTS public.imagens_quarto (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quarto_id UUID NOT NULL REFERENCES public.quartos(id) ON DELETE CASCADE,
  caminho_arquivo TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de carros
CREATE TABLE IF NOT EXISTS public.carros (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  ano INTEGER NOT NULL,
  descricao TEXT,
  preco_diaria NUMERIC(10, 2) NOT NULL,
  localizacao TEXT NOT NULL,
  tipo_transmissao TEXT NOT NULL CHECK (tipo_transmissao IN ('Manual', 'Automático')),
  tipo_combustivel TEXT NOT NULL,
  numero_portas INTEGER NOT NULL,
  capacidade_passageiros INTEGER NOT NULL,
  tem_ar_condicionado BOOLEAN DEFAULT FALSE,
  quantidade_disponivel INTEGER NOT NULL,
  avaliacao_media NUMERIC(3, 2),
  gerente_id UUID REFERENCES public.usuarios(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de imagens de carros
CREATE TABLE IF NOT EXISTS public.imagens_carro (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  carro_id UUID NOT NULL REFERENCES public.carros(id) ON DELETE CASCADE,
  caminho_arquivo TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de salões de eventos
CREATE TABLE IF NOT EXISTS public.saloes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  descricao TEXT,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  capacidade INTEGER NOT NULL,
  preco_diaria NUMERIC(10, 2) NOT NULL,
  tem_ar_condicionado BOOLEAN DEFAULT FALSE,
  tem_estacionamento BOOLEAN DEFAULT FALSE,
  tem_wifi BOOLEAN DEFAULT FALSE,
  tem_palco BOOLEAN DEFAULT FALSE,
  tem_som BOOLEAN DEFAULT FALSE,
  tem_iluminacao BOOLEAN DEFAULT FALSE,
  avaliacao_media NUMERIC(3, 2),
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  gerente_id UUID REFERENCES public.usuarios(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de imagens de salões
CREATE TABLE IF NOT EXISTS public.imagens_salao (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salao_id UUID NOT NULL REFERENCES public.saloes(id) ON DELETE CASCADE,
  caminho_arquivo TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de pacotes turísticos
CREATE TABLE IF NOT EXISTS public.pacotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  descricao TEXT,
  destino_principal TEXT NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  duracao_dias INTEGER NOT NULL,
  inclui TEXT,
  min_pessoas INTEGER NOT NULL,
  max_pessoas INTEGER NOT NULL,
  avaliacao_media NUMERIC(3, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de imagens de pacotes
CREATE TABLE IF NOT EXISTS public.imagens_pacote (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pacote_id UUID NOT NULL REFERENCES public.pacotes(id) ON DELETE CASCADE,
  caminho_arquivo TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de reservas de hotel
CREATE TABLE IF NOT EXISTS public.reservas_hotel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  quarto_id UUID NOT NULL REFERENCES public.quartos(id),
  data_checkin DATE NOT NULL,
  data_checkout DATE NOT NULL,
  quantidade_hospedes INTEGER NOT NULL,
  preco_total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmada', 'cancelada', 'concluida')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT check_datas CHECK (data_checkout > data_checkin)
);

-- Tabela de reservas de carro
CREATE TABLE IF NOT EXISTS public.reservas_carro (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  carro_id UUID NOT NULL REFERENCES public.carros(id),
  data_retirada TIMESTAMP WITH TIME ZONE NOT NULL,
  data_devolucao TIMESTAMP WITH TIME ZONE NOT NULL,
  local_retirada TEXT NOT NULL,
  local_devolucao TEXT NOT NULL,
  preco_total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmada', 'cancelada', 'concluida')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT check_datas CHECK (data_devolucao > data_retirada)
);

-- Tabela de reservas de salão
CREATE TABLE IF NOT EXISTS public.reservas_salao (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  salao_id UUID NOT NULL REFERENCES public.saloes(id),
  data_evento DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  quantidade_convidados INTEGER NOT NULL,
  tipo_evento TEXT NOT NULL,
  preco_total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmada', 'cancelada', 'concluida')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT check_horas CHECK (hora_fim > hora_inicio)
);

-- Tabela de reservas de pacote
CREATE TABLE IF NOT EXISTS public.reservas_pacote (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  pacote_id UUID NOT NULL REFERENCES public.pacotes(id),
  data_inicio DATE NOT NULL,
  quantidade_pessoas INTEGER NOT NULL,
  preco_total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmada', 'cancelada', 'concluida')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de avaliações de hotel
CREATE TABLE IF NOT EXISTS public.avaliacoes_hotel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  hotel_id UUID NOT NULL REFERENCES public.hoteis(id),
  pontuacao INTEGER NOT NULL CHECK (pontuacao BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(usuario_id, hotel_id)
);

-- Tabela de avaliações de carro
CREATE TABLE IF NOT EXISTS public.avaliacoes_carro (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  carro_id UUID NOT NULL REFERENCES public.carros(id),
  pontuacao INTEGER NOT NULL CHECK (pontuacao BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(usuario_id, carro_id)
);

-- Tabela de avaliações de salão
CREATE TABLE IF NOT EXISTS public.avaliacoes_salao (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  salao_id UUID NOT NULL REFERENCES public.saloes(id),
  pontuacao INTEGER NOT NULL CHECK (pontuacao BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(usuario_id, salao_id)
);

-- Tabela de avaliações de pacote
CREATE TABLE IF NOT EXISTS public.avaliacoes_pacote (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  pacote_id UUID NOT NULL REFERENCES public.pacotes(id),
  pontuacao INTEGER NOT NULL CHECK (pontuacao BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(usuario_id, pacote_id)
);

-- Triggers para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger para todas as tabelas com coluna updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_hoteis_updated_at BEFORE UPDATE ON hoteis
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_quartos_updated_at BEFORE UPDATE ON quartos
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_carros_updated_at BEFORE UPDATE ON carros
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_saloes_updated_at BEFORE UPDATE ON saloes
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_pacotes_updated_at BEFORE UPDATE ON pacotes
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reservas_hotel_updated_at BEFORE UPDATE ON reservas_hotel
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reservas_carro_updated_at BEFORE UPDATE ON reservas_carro
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reservas_salao_updated_at BEFORE UPDATE ON reservas_salao
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reservas_pacote_updated_at BEFORE UPDATE ON reservas_pacote
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Função para criar usuário (usada no hook useSupabaseAuth)
CREATE OR REPLACE FUNCTION criar_usuario(
  user_id UUID,
  user_email TEXT,
  user_nome TEXT,
  user_sobrenome TEXT,
  user_telefone TEXT DEFAULT NULL,
  user_data_nascimento DATE DEFAULT NULL,
  user_cpf TEXT DEFAULT NULL
)
RETURNS SETOF usuarios AS $$
BEGIN
  RETURN QUERY
  INSERT INTO usuarios (id, email, nome, sobrenome, telefone, data_nascimento, cpf)
  VALUES (user_id, user_email, user_nome, user_sobrenome, user_telefone, user_data_nascimento, user_cpf)
  RETURNING *;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 