-- Função para criar um novo usuário na tabela usuarios
-- Esta função pode ser chamada por qualquer usuário autenticado
CREATE OR REPLACE FUNCTION criar_usuario(
  user_id UUID,
  user_email TEXT,
  user_nome TEXT,
  user_sobrenome TEXT,
  user_telefone TEXT DEFAULT NULL,
  user_data_nascimento DATE DEFAULT NULL,
  user_cpf TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Executa com os privilégios do criador da função
SET search_path = public
AS $$
DECLARE
  resultado JSONB;
BEGIN
  -- Verificar se o usuário já existe
  IF EXISTS (SELECT 1 FROM usuarios WHERE id = user_id) THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Usuário já existe'
    );
  END IF;

  -- Inserir o usuário
  INSERT INTO usuarios (
    id,
    email,
    nome,
    sobrenome,
    telefone,
    data_nascimento,
    cpf,
    tipo_usuario,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    user_email,
    user_nome,
    user_sobrenome,
    user_telefone,
    user_data_nascimento,
    user_cpf,
    'cliente',
    NOW(),
    NOW()
  )
  RETURNING jsonb_build_object(
    'id', id,
    'email', email,
    'nome', nome,
    'sobrenome', sobrenome,
    'tipo_usuario', tipo_usuario
  ) INTO resultado;

  RETURN jsonb_build_object(
    'success', true,
    'data', resultado
  );
EXCEPTION
  WHEN others THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', SQLERRM,
      'error_code', SQLSTATE
    );
END;
$$; 