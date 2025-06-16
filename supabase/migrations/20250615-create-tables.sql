-- Habilitar a extensão uuid-ossp para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  telefone TEXT,
  data_nascimento DATE,
  cpf TEXT UNIQUE,
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('cliente', 'admin', 'hotel')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar o timestamp de updated_at
CREATE TRIGGER update_usuarios_updated_at
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Configurar políticas de segurança para a tabela usuarios
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Política para permitir que os usuários vejam apenas seus próprios dados
CREATE POLICY "Usuários podem ver seus próprios dados" ON usuarios
  FOR SELECT USING (auth.uid() = id);

-- Política para permitir que os usuários atualizem apenas seus próprios dados
CREATE POLICY "Usuários podem atualizar seus próprios dados" ON usuarios
  FOR UPDATE USING (auth.uid() = id);

-- Política para permitir que os usuários insiram seus próprios dados
CREATE POLICY "Usuários podem inserir seus próprios dados" ON usuarios
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Política para permitir que administradores vejam todos os dados
CREATE POLICY "Administradores podem ver todos os dados" ON usuarios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid() AND tipo_usuario = 'admin'
    )
  );

-- Política para permitir que administradores atualizem todos os dados
CREATE POLICY "Administradores podem atualizar todos os dados" ON usuarios
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid() AND tipo_usuario = 'admin'
    )
  ); 