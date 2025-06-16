# Instruções Atualizadas para Configuração do Banco de Dados Supabase

Este documento contém instruções atualizadas para configurar o banco de dados no Supabase para o projeto AKI Viagens Afrika.

## Problema de Chave Estrangeira

O erro que ocorre ao executar o `fake_data.sql` é:
```
ERROR: 23503: insert or update on table "usuarios" violates foreign key constraint "usuarios_id_fkey"
DETAIL: Key (id)=(aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa) is not present in table "users".
```

Este erro acontece porque a tabela `usuarios` tem uma chave estrangeira que referencia a tabela `auth.users`. Quando tentamos inserir um registro na tabela `usuarios` com um ID que não existe na tabela `auth.users`, o PostgreSQL retorna esse erro.

## Solução

Para resolver este problema, criamos um novo arquivo `fake_data_fix.sql` que:

1. Insere primeiro os dados que não dependem de usuários (hotéis, quartos, carros, salões, pacotes, imagens)
2. Fornece instruções para criar manualmente os usuários no Supabase Auth
3. Fornece exemplos de como inserir os registros na tabela `usuarios` usando os IDs gerados pelo Supabase Auth
4. Fornece exemplos de como atualizar as tabelas para associar gerentes

## Arquivos SQL

O projeto contém os seguintes arquivos SQL:

1. **schema.sql** - Define todas as tabelas do sistema
2. **buckets.sql** - Cria os buckets de armazenamento no Supabase Storage
3. **rls.sql** - Configura as políticas de segurança (Row Level Security)
4. **fake_data_fix.sql** - Insere dados fictícios sem depender de IDs de auth.users

## Ordem de Execução Correta

Execute os scripts SQL no painel de administração do Supabase na seguinte ordem:

1. `schema.sql` - Cria a estrutura do banco de dados
2. `buckets.sql` - Configura os buckets de armazenamento
3. `fake_data_fix.sql` - Insere dados fictícios básicos (hotéis, quartos, etc.)
4. Crie usuários no Supabase Auth manualmente
5. Insira registros na tabela `usuarios` usando os IDs gerados pelo Supabase Auth
6. Atualize as tabelas para associar gerentes
7. `rls.sql` - Configura as políticas de segurança

## Instruções Passo a Passo

### 1. Execute o script schema.sql

Este script cria todas as tabelas necessárias.

### 2. Execute o script buckets.sql

Este script cria os buckets de armazenamento.

### 3. Execute o script fake_data_fix.sql

Este script insere dados básicos que não dependem de usuários.

### 4. Crie usuários no Supabase Auth

Acesse o painel de administração do Supabase:
1. Vá para "Authentication" > "Users"
2. Clique em "Invite user" ou "New user"
3. Crie os seguintes usuários:
   - admin@akiviagens.com (senha de sua escolha)
   - maria@exemplo.com (senha de sua escolha)
   - joao@exemplo.com (senha de sua escolha)
   - gerente.hotel@akiviagens.com (senha de sua escolha)
   - gerente.carro@akiviagens.com (senha de sua escolha)
   - gerente.salao@akiviagens.com (senha de sua escolha)

### 5. Obtenha os IDs dos usuários

Após criar os usuários, anote os IDs gerados pelo Supabase Auth:
1. No painel do Supabase, vá para "Authentication" > "Users"
2. Copie o UUID de cada usuário criado

### 6. Insira registros na tabela usuarios

Execute o seguinte SQL, substituindo os IDs pelos valores reais:

```sql
INSERT INTO public.usuarios (id, email, nome, sobrenome, telefone, data_nascimento, cpf, tipo_usuario)
VALUES
  ('ID-DO-ADMIN', 'admin@akiviagens.com', 'Admin', 'Sistema', '+244 923456789', '1990-01-01', '12345678900', 'admin'),
  ('ID-DO-CLIENTE1', 'maria@exemplo.com', 'Maria', 'Silva', '+244 923456790', '1992-05-15', '98765432100', 'cliente'),
  ('ID-DO-CLIENTE2', 'joao@exemplo.com', 'João', 'Santos', '+244 923456791', '1985-10-20', '45678912300', 'cliente'),
  ('ID-DO-GERENTE-HOTEL', 'gerente.hotel@akiviagens.com', 'Carlos', 'Mendes', '+244 923456792', '1988-03-25', '78945612300', 'gerente_hotel'),
  ('ID-DO-GERENTE-CARRO', 'gerente.carro@akiviagens.com', 'Ana', 'Oliveira', '+244 923456793', '1991-07-12', '32165498700', 'gerente_carro'),
  ('ID-DO-GERENTE-SALAO', 'gerente.salao@akiviagens.com', 'Paulo', 'Costa', '+244 923456794', '1987-11-30', '65432198700', 'gerente_salao');
```

### 7. Atualize as tabelas para associar gerentes

Execute o seguinte SQL, substituindo os IDs pelos valores reais:

```sql
UPDATE public.hoteis SET gerente_id = 'ID-DO-GERENTE-HOTEL';
UPDATE public.carros SET gerente_id = 'ID-DO-GERENTE-CARRO';
UPDATE public.saloes SET gerente_id = 'ID-DO-GERENTE-SALAO';
```

### 8. Execute o script rls.sql

Este script configura as políticas de segurança.

## Inserir Dados de Reservas e Avaliações

Após inserir os usuários, você pode inserir dados de reservas e avaliações usando o seguinte SQL (substitua os IDs pelos valores reais):

```sql
-- Inserir reservas de hotel
INSERT INTO public.reservas_hotel (id, usuario_id, quarto_id, data_checkin, data_checkout, 
                                  quantidade_hospedes, preco_total, status, observacoes)
VALUES
  (gen_random_uuid(), 'ID-DO-CLIENTE1', 'aaaaaaaa-1111-1111-1111-111111111111', '2024-07-15', '2024-07-18', 
   2, 105000, 'confirmada', 'Preferência por andar alto'),
  (gen_random_uuid(), 'ID-DO-CLIENTE2', 'bbbbbbbb-1111-1111-1111-111111111111', '2024-08-10', '2024-08-15', 
   2, 210000, 'confirmada', 'Chegada tardia, por volta das 22h');

-- Inserir avaliações de hotel
INSERT INTO public.avaliacoes_hotel (id, usuario_id, hotel_id, pontuacao, comentario, created_at)
VALUES
  (gen_random_uuid(), 'ID-DO-CLIENTE1', '11111111-1111-1111-1111-111111111111', 5, 'Excelente hotel, atendimento impecável e instalações de primeira linha.', NOW() - INTERVAL '30 days'),
  (gen_random_uuid(), 'ID-DO-CLIENTE2', '11111111-1111-1111-1111-111111111111', 4, 'Muito bom hotel, apenas o café da manhã poderia ter mais opções.', NOW() - INTERVAL '45 days');
```

## Imagens

Os caminhos de imagens nos dados fictícios são apenas espaços reservados. Para ter imagens reais:

1. Faça upload de imagens para os buckets correspondentes (hoteis, quartos, carros, saloes, pacotes)
2. Atualize os caminhos de arquivo nas tabelas de imagens para apontar para os arquivos reais

## Testando a Aplicação

Após configurar o banco de dados:

1. Configure as credenciais do Supabase no arquivo `src/lib/supabase.ts`
2. Inicie a aplicação com `npm run dev`
3. Você pode fazer login com qualquer um dos usuários criados
4. Teste as funcionalidades de visualização e reserva de hotéis, carros, salões e pacotes 