-- Correção para a consulta que está causando o erro
-- O problema é que na tabela avaliacoes_hotel existe a coluna 'pontuacao' e não 'classificacao'

-- Consulta original com erro:
-- SELECT AVG(a.classificacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id

-- Consulta corrigida:
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

-- Explicação:
-- 1. Substituímos 'a.classificacao' por 'a.pontuacao', que é o nome correto da coluna na tabela avaliacoes_hotel
-- 2. Mantemos o alias 'classificacao_media' para compatibilidade com o código existente
-- 3. Usamos COALESCE para retornar 4 como valor padrão caso não existam avaliações 