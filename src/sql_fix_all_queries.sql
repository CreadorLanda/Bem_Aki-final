-- Correção para todas as consultas que usam a coluna incorreta na tabela avaliacoes_hotel
-- O problema é que na tabela avaliacoes_hotel existe a coluna 'pontuacao' e não 'classificacao'

-- 1. Consulta para obter hotéis com avaliações
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

-- 2. Consulta para obter hotéis com melhor classificação
SELECT 
  h.*,
  COALESCE(
    (SELECT AVG(a.pontuacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id),
    0
  ) as media_classificacao
FROM hoteis h
ORDER BY media_classificacao DESC;

-- 3. Consulta para atualizar estatísticas de avaliação média
UPDATE public.estatisticas
SET 
  avaliacao_media_hoteis = (
    SELECT COALESCE(AVG(a.pontuacao), 0) 
    FROM avaliacoes_hotel a
    JOIN hoteis h ON a.hotel_id = h.id
  ),
  updated_at = NOW();

-- 4. Consulta para exibir hotéis com suas avaliações médias
SELECT 
  h.id,
  h.nome,
  h.cidade,
  h.endereco,
  COALESCE(
    (SELECT AVG(a.pontuacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id),
    0
  ) as avaliacao_media,
  (SELECT COUNT(*) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id) as total_avaliacoes
FROM hoteis h
ORDER BY avaliacao_media DESC, total_avaliacoes DESC;

-- 5. Consulta para filtrar hotéis por avaliação mínima
SELECT 
  h.*,
  COALESCE(
    (SELECT AVG(a.pontuacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id),
    0
  ) as avaliacao_media_calculada
FROM hoteis h
HAVING avaliacao_media_calculada >= 4
ORDER BY avaliacao_media_calculada DESC; 