-- SQL para verificar a estrutura atual da tabela hoteis
SELECT 
  column_name, 
  data_type 
FROM 
  information_schema.columns 
WHERE 
  table_name = 'hoteis';

-- SQL para adicionar a coluna classificacao à tabela hoteis se ela não existir
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'hoteis' AND column_name = 'classificacao'
  ) THEN
    ALTER TABLE hoteis ADD COLUMN classificacao INTEGER;
  END IF;
END $$;

-- SQL para atualizar a coluna classificacao com valores padrão
UPDATE hoteis SET classificacao = 4 WHERE classificacao IS NULL;

-- SQL para corrigir a consulta no código
-- Em vez de usar:
-- SELECT ..., h.classificacao, ... FROM hoteis h
-- Use:
SELECT 
  h.*,
  COALESCE(
    (SELECT AVG(a.classificacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id),
    4
  ) as classificacao_media,
  (
    SELECT json_agg(i.*) 
    FROM imagens_hotel i 
    WHERE i.hotel_id = h.id
  ) as imagens
FROM hoteis h
ORDER BY h.nome;

-- Alternativa: modificar o hook useReservas.ts para não incluir a coluna classificacao na consulta
-- Exemplo de consulta simplificada:
SELECT 
  h.id,
  h.nome,
  h.endereco,
  h.cidade,
  (
    SELECT json_agg(i.*) 
    FROM imagens_hotel i 
    WHERE i.hotel_id = h.id
  ) as imagens
FROM hoteis h
ORDER BY h.nome; 