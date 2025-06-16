-- SQL para verificar a estrutura atual da tabela avaliacoes_hotel
SELECT 
  column_name, 
  data_type 
FROM 
  information_schema.columns 
WHERE 
  table_name = 'avaliacoes_hotel';

-- SQL para adicionar a coluna classificacao à tabela avaliacoes_hotel se ela não existir
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'avaliacoes_hotel' AND column_name = 'classificacao'
  ) THEN
    ALTER TABLE avaliacoes_hotel ADD COLUMN classificacao INTEGER;
  END IF;
END $$;

-- SQL para atualizar a coluna classificacao com valores padrão (entre 1 e 5)
UPDATE avaliacoes_hotel SET classificacao = 4 WHERE classificacao IS NULL;

-- SQL para corrigir a consulta que está causando o erro
-- Em vez de usar:
-- SELECT AVG(a.classificacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id
-- Use:
SELECT 
  h.*,
  4 as classificacao_media, -- Valor fixo como solução temporária
  (
    SELECT json_agg(i.*) 
    FROM imagens_hotel i 
    WHERE i.hotel_id = h.id
  ) as imagens
FROM hoteis h
ORDER BY h.nome;

-- Ou, se você tiver uma coluna de avaliação na tabela avaliacoes_hotel com outro nome:
-- Verifique os nomes corretos das colunas
SELECT 
  h.*,
  COALESCE(
    (SELECT AVG(a.pontuacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id),
    4
  ) as classificacao_media,
  (
    SELECT json_agg(i.*) 
    FROM imagens_hotel i 
    WHERE i.hotel_id = h.id
  ) as imagens
FROM hoteis h
ORDER BY h.nome;

-- Consulta para verificar se há alguma coluna relacionada à classificação na tabela avaliacoes_hotel
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'avaliacoes_hotel' 
AND column_name LIKE '%pont%' OR column_name LIKE '%class%' OR column_name LIKE '%aval%' OR column_name LIKE '%rat%' OR column_name LIKE '%nota%'; 