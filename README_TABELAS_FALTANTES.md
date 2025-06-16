# Tabelas Adicionais para o Sistema AKI Viagens Afrika

Este documento descreve as tabelas adicionais que foram criadas para o sistema AKI Viagens Afrika para corrigir erros de referência a tabelas inexistentes.

## Tabelas Adicionadas

### 1. Tabela `depoimentos`

Esta tabela armazena os depoimentos dos clientes sobre os serviços da AKI Viagens Afrika.

**Estrutura:**
```sql
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
```

**Campos:**
- `id`: Identificador único do depoimento
- `usuario_id`: ID do usuário que fez o depoimento (referência à tabela auth.users)
- `nome`: Nome da pessoa que fez o depoimento
- `cargo`: Cargo da pessoa (opcional)
- `empresa`: Empresa da pessoa (opcional)
- `depoimento`: Texto do depoimento
- `imagem_url`: URL da imagem de perfil (opcional)
- `avaliacao`: Avaliação de 1 a 5 estrelas
- `aprovado`: Indica se o depoimento foi aprovado para exibição
- `created_at`: Data de criação do registro
- `updated_at`: Data da última atualização do registro

### 2. Tabela `estatisticas`

Esta tabela armazena estatísticas gerais do sistema para exibição em dashboards e seções de métricas.

**Estrutura:**
```sql
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
```

**Campos:**
- `id`: Identificador único do registro de estatísticas
- `total_hoteis`: Total de hotéis cadastrados
- `total_quartos`: Total de quartos cadastrados
- `total_carros`: Total de carros cadastrados
- `total_saloes`: Total de salões cadastrados
- `total_pacotes`: Total de pacotes cadastrados
- `total_usuarios`: Total de usuários cadastrados
- `total_reservas_hotel`: Total de reservas de hotel realizadas
- `total_reservas_carro`: Total de reservas de carro realizadas
- `total_reservas_salao`: Total de reservas de salão realizadas
- `total_reservas_pacote`: Total de reservas de pacote realizadas
- `avaliacao_media_hoteis`: Avaliação média dos hotéis
- `avaliacao_media_carros`: Avaliação média dos carros
- `avaliacao_media_saloes`: Avaliação média dos salões
- `avaliacao_media_pacotes`: Avaliação média dos pacotes
- `destino_mais_popular`: Destino mais popular entre as reservas
- `updated_at`: Data da última atualização das estatísticas

## Como Executar os Scripts

Os scripts para criar estas tabelas estão nos arquivos:
- `depoimentos.sql`
- `estatisticas.sql`

Execute-os no painel SQL do Supabase na seguinte ordem:

1. Primeiro execute `depoimentos.sql`
2. Em seguida, execute `estatisticas.sql`

## Políticas de Segurança (RLS)

Ambas as tabelas têm políticas de segurança configuradas:

### Depoimentos:
- Depoimentos aprovados são visíveis para todos
- Usuários podem ver, criar e atualizar seus próprios depoimentos
- Administradores podem gerenciar todos os depoimentos

### Estatísticas:
- Estatísticas são visíveis para todos
- Apenas administradores podem modificar as estatísticas 