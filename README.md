# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b02f669b-d942-47f5-a42c-b8d9baa00e0a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b02f669b-d942-47f5-a42c-b8d9baa00e0a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b02f669b-d942-47f5-a42c-b8d9baa00e0a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Configuração do Supabase

Este projeto utiliza o Supabase como backend. Siga os passos abaixo para configurar:

### Credenciais

As credenciais do Supabase estão configuradas no arquivo `src/lib/supabase.ts`:

```
NEXT_PUBLIC_SUPABASE_URL=https://eaugzwsrnvyyzslmrgjv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhdWd6d3NybnZ5eXpzbG1yZ2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODY0NjAsImV4cCI6MjA2NTU2MjQ2MH0.Y9ZCRgCTlRx0GJHoXAuNXMWGvuS8yOirvtc4B6hHBMY
```

### Estrutura do Banco de Dados

Os scripts SQL para criação da estrutura do banco de dados estão disponíveis nos seguintes arquivos:

1. `schema.sql` - Contém a definição de todas as tabelas
2. `buckets.sql` - Contém a configuração dos buckets de armazenamento
3. `rls.sql` - Contém as políticas de segurança em nível de linha (Row Level Security)
4. `seed.sql` - Contém dados de exemplo para popular o banco de dados

Para configurar o banco de dados:

1. Acesse o painel do Supabase: https://app.supabase.com
2. Selecione o projeto
3. Vá para a seção "SQL Editor"
4. Execute os scripts na seguinte ordem:
   - Primeiro o `schema.sql`
   - Depois o `buckets.sql`
   - Em seguida o `rls.sql`
   - Por último o `seed.sql` (opcional, apenas se quiser dados de exemplo)

### Uso no Código

Para usar o cliente Supabase em seus componentes:

```tsx
import { supabase } from '@/lib/supabase';

// Exemplo de consulta
const fetchData = async () => {
  const { data, error } = await supabase
    .from('tabela')
    .select('*');
    
  if (error) console.error('Erro:', error);
  return data;
};
```
#   B e m _ A k i - f i n a l  
 