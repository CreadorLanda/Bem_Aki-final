-- Criação dos buckets para armazenamento de arquivos no Supabase Storage

-- Bucket para imagens de hotéis
INSERT INTO storage.buckets (id, name, public)
VALUES ('hoteis', 'hoteis', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imagens de quartos
INSERT INTO storage.buckets (id, name, public)
VALUES ('quartos', 'quartos', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imagens de carros
INSERT INTO storage.buckets (id, name, public)
VALUES ('carros', 'carros', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imagens de salões
INSERT INTO storage.buckets (id, name, public)
VALUES ('saloes', 'saloes', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imagens de pacotes
INSERT INTO storage.buckets (id, name, public)
VALUES ('pacotes', 'pacotes', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para avatares de usuários
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatares', 'avatares', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para comprovantes de pagamento (acesso privado)
INSERT INTO storage.buckets (id, name, public)
VALUES ('comprovantes', 'comprovantes', false)
ON CONFLICT (id) DO NOTHING;

-- Políticas de acesso para os buckets

-- Políticas para imagens de hotéis (acesso público para leitura)
CREATE POLICY "Acesso público para visualizar imagens de hotéis" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hoteis');

CREATE POLICY "Acesso de upload para administradores e hotéis" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hoteis' AND (auth.uid() IN (
  SELECT id FROM public.usuarios WHERE tipo_usuario IN ('admin', 'hotel')
)));

-- Políticas para imagens de quartos (acesso público para leitura)
CREATE POLICY "Acesso público para visualizar imagens de quartos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'quartos');

CREATE POLICY "Acesso de upload para administradores e hotéis - quartos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'quartos' AND (auth.uid() IN (
  SELECT id FROM public.usuarios WHERE tipo_usuario IN ('admin', 'hotel')
)));

-- Políticas para imagens de carros (acesso público para leitura)
CREATE POLICY "Acesso público para visualizar imagens de carros" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'carros');

CREATE POLICY "Acesso de upload para administradores - carros" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'carros' AND (auth.uid() IN (
  SELECT id FROM public.usuarios WHERE tipo_usuario = 'admin'
)));

-- Políticas para imagens de salões (acesso público para leitura)
CREATE POLICY "Acesso público para visualizar imagens de salões" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'saloes');

CREATE POLICY "Acesso de upload para administradores - salões" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'saloes' AND (auth.uid() IN (
  SELECT id FROM public.usuarios WHERE tipo_usuario = 'admin'
)));

-- Políticas para imagens de pacotes (acesso público para leitura)
CREATE POLICY "Acesso público para visualizar imagens de pacotes" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'pacotes');

CREATE POLICY "Acesso de upload para administradores - pacotes" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'pacotes' AND (auth.uid() IN (
  SELECT id FROM public.usuarios WHERE tipo_usuario = 'admin'
)));

-- Políticas para comprovantes de pagamento (acesso privado)
CREATE POLICY "Acesso restrito para visualizar comprovantes" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'comprovantes' AND (
  auth.uid() = owner OR 
  auth.uid() IN (SELECT id FROM public.usuarios WHERE tipo_usuario = 'admin')
));

CREATE POLICY "Acesso de upload para usuários autenticados - comprovantes" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'comprovantes' AND auth.uid() IS NOT NULL); 