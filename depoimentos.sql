-- Script para criar a tabela de depoimentos

-- Criar tabela de depoimentos
CREATE TABLE IF NOT EXISTS public.depoimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cargo TEXT,
  empresa TEXT,
  depoimento TEXT NOT NULL,
  imagem_url TEXT,
  avaliacao INTEGER NOT NULL CHECK (avaliacao BETWEEN 1 AND 5),
  aprovado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar comentários à tabela e colunas
COMMENT ON TABLE public.depoimentos IS 'Depoimentos de clientes sobre a AKI Viagens Afrika';
COMMENT ON COLUMN public.depoimentos.id IS 'ID único do depoimento';
COMMENT ON COLUMN public.depoimentos.usuario_id IS 'ID do usuário que fez o depoimento (pode ser nulo para depoimentos anônimos)';
COMMENT ON COLUMN public.depoimentos.nome IS 'Nome da pessoa que fez o depoimento';
COMMENT ON COLUMN public.depoimentos.cargo IS 'Cargo da pessoa (opcional)';
COMMENT ON COLUMN public.depoimentos.empresa IS 'Empresa da pessoa (opcional)';
COMMENT ON COLUMN public.depoimentos.depoimento IS 'Texto do depoimento';
COMMENT ON COLUMN public.depoimentos.imagem_url IS 'URL da imagem de perfil (opcional)';
COMMENT ON COLUMN public.depoimentos.avaliacao IS 'Avaliação de 1 a 5 estrelas';
COMMENT ON COLUMN public.depoimentos.aprovado IS 'Indica se o depoimento foi aprovado para exibição';
COMMENT ON COLUMN public.depoimentos.created_at IS 'Data de criação do registro';
COMMENT ON COLUMN public.depoimentos.updated_at IS 'Data da última atualização do registro';

-- Criar índice para buscas por aprovação
CREATE INDEX IF NOT EXISTS idx_depoimentos_aprovado ON public.depoimentos(aprovado);

-- Configurar RLS (Row Level Security)
ALTER TABLE public.depoimentos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Depoimentos visíveis para todos quando aprovados" 
  ON public.depoimentos FOR SELECT 
  USING (aprovado = true);

CREATE POLICY "Usuários podem ver seus próprios depoimentos" 
  ON public.depoimentos FOR SELECT 
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar seus próprios depoimentos" 
  ON public.depoimentos FOR INSERT 
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem atualizar seus próprios depoimentos" 
  ON public.depoimentos FOR UPDATE 
  USING (auth.uid() = usuario_id)
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Admins podem fazer tudo" 
  ON public.depoimentos 
  USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'admin'
    )
  );

-- Inserir alguns depoimentos de exemplo
INSERT INTO public.depoimentos (nome, cargo, empresa, depoimento, avaliacao, aprovado)
VALUES
  ('Ana Ferreira', 'Empresária', 'Tech Solutions', 'Excelente serviço! A AKI Viagens organizou nossa viagem corporativa com perfeição. Recomendo a todos.', 5, true),
  ('Carlos Mendonça', 'Engenheiro', 'Construções Angola', 'Minha família e eu tivemos uma experiência incrível no Safari Kissama. Guias muito bem preparados e atenciosos.', 5, true),
  ('Sofia Martins', 'Médica', 'Hospital Central', 'A estadia no Hotel Presidente foi maravilhosa. Atendimento de primeira e instalações impecáveis.', 4, true),
  ('Pedro Santos', 'Professor', 'Universidade de Luanda', 'O passeio às Quedas de Kalandula foi inesquecível. Organização perfeita e preço justo.', 5, true); 