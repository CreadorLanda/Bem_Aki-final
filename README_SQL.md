# Instruções para Configuração do Banco de Dados Supabase

Este documento contém instruções para configurar o banco de dados no Supabase para o projeto AKI Viagens Afrika.

## Arquivos SQL

O projeto contém os seguintes arquivos SQL:

1. **schema.sql** - Define todas as tabelas do sistema
2. **buckets.sql** - Cria os buckets de armazenamento no Supabase Storage
3. **rls.sql** - Configura as políticas de segurança (Row Level Security)
4. **seed.sql** - Insere dados de exemplo básicos
5. **fake_data.sql** - Insere dados fictícios mais completos para testes

## Ordem de Execução

Execute os scripts SQL no painel de administração do Supabase na seguinte ordem:

1. `schema.sql` - Cria a estrutura do banco de dados
2. `buckets.sql` - Configura os buckets de armazenamento
3. `fake_data.sql` - Insere dados fictícios para testes (opcional)
4. `rls.sql` - Configura as políticas de segurança

## Instruções para Dados Fictícios (fake_data.sql)

O arquivo `fake_data.sql` contém dados fictícios para testes com IDs fixos. Para usá-lo corretamente:

1. Primeiro, crie os usuários no Supabase Auth:
   - Um usuário admin (admin@akiviagens.com)
   - Dois usuários clientes (maria@exemplo.com, joao@exemplo.com)
   - Três usuários gerentes (gerente.hotel@akiviagens.com, gerente.carro@akiviagens.com, gerente.salao@akiviagens.com)

2. Obtenha os IDs gerados pelo Supabase Auth para cada usuário (você pode vê-los no painel de administração do Supabase, na seção Authentication > Users)

3. Substitua os UUIDs fictícios no início do arquivo `fake_data.sql` pelos IDs reais:
   ```sql
   DO $$
   DECLARE
     admin_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'; -- Substitua pelo ID real
     cliente1_id UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'; -- Substitua pelo ID real
     cliente2_id UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc'; -- Substitua pelo ID real
     gerente_hotel_id UUID := 'dddddddd-dddd-dddd-dddd-dddddddddddd'; -- Substitua pelo ID real
     gerente_carro_id UUID := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'; -- Substitua pelo ID real
     gerente_salao_id UUID := 'ffffffff-ffff-ffff-ffff-ffffffffffff'; -- Substitua pelo ID real
   ```

4. Execute o script `fake_data.sql` no SQL Editor do Supabase

## Imagens

Os caminhos de imagens nos dados fictícios são apenas espaços reservados. Para ter imagens reais:

1. Faça upload de imagens para os buckets correspondentes (hoteis, quartos, carros, saloes, pacotes)
2. Atualize os caminhos de arquivo nas tabelas de imagens para apontar para os arquivos reais

## Notas Importantes

- O script `fake_data.sql` usa a cláusula `ON CONFLICT (id) DO UPDATE` para usuários, o que permite executá-lo várias vezes sem criar duplicatas
- Os IDs de hotéis, quartos, carros, salões e pacotes são fixos para facilitar a criação de relacionamentos
- As políticas de segurança (RLS) devem ser aplicadas por último, após todos os dados estarem inseridos

## Testando a Aplicação

Após configurar o banco de dados:

1. Configure as credenciais do Supabase no arquivo `src/lib/supabase.ts`
2. Inicie a aplicação com `npm run dev`
3. Você pode fazer login com qualquer um dos usuários criados
4. Teste as funcionalidades de visualização e reserva de hotéis, carros, salões e pacotes 