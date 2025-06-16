-- Exemplos de Consultas SQL para o Supabase
-- Projeto: BEMAKI_Final / aki-viagens-afrika-main

-- 1. Consulta básica para obter todos os hotéis
SELECT * FROM hoteis ORDER BY nome;

-- 2. Consulta para obter hotéis com suas imagens
SELECT 
  h.*,
  (
    SELECT json_agg(i.*) 
    FROM imagens_hotel i 
    WHERE i.hotel_id = h.id
  ) as imagens
FROM hoteis h
ORDER BY h.nome;

-- 3. Consulta para obter quartos de um hotel específico
SELECT 
  q.*,
  (
    SELECT json_agg(i.*) 
    FROM imagens_quarto i 
    WHERE i.quarto_id = q.id
  ) as imagens
FROM quartos q
WHERE q.hotel_id = 'id_do_hotel'
ORDER BY q.preco_noite;

-- 4. Consulta para obter reservas de hotel de um usuário
SELECT 
  rh.*,
  q.tipo as tipo_quarto,
  h.nome as nome_hotel,
  h.cidade as cidade_hotel
FROM reservas_hotel rh
JOIN quartos q ON rh.quarto_id = q.id
JOIN hoteis h ON q.hotel_id = h.id
WHERE rh.usuario_id = 'id_do_usuario'
ORDER BY rh.data_checkin DESC;

-- 5. Consulta para obter carros disponíveis
SELECT 
  c.*,
  (
    SELECT json_agg(i.*) 
    FROM imagens_carro i 
    WHERE i.carro_id = c.id
  ) as imagens
FROM carros c
WHERE c.disponivel = true
ORDER BY c.preco_diaria;

-- 6. Consulta para obter reservas de carro de um usuário
SELECT 
  rc.*,
  c.marca,
  c.modelo,
  c.ano
FROM reservas_carro rc
JOIN carros c ON rc.carro_id = c.id
WHERE rc.usuario_id = 'id_do_usuario'
ORDER BY rc.data_retirada DESC;

-- 7. Consulta para obter pacotes turísticos
SELECT 
  p.*,
  (
    SELECT json_agg(i.*) 
    FROM imagens_pacote i 
    WHERE i.pacote_id = p.id
  ) as imagens
FROM pacotes p
WHERE p.vagas_disponiveis > 0
ORDER BY p.data_inicio;

-- 8. Consulta para obter avaliações de um hotel
SELECT 
  a.*,
  u.nome,
  u.sobrenome
FROM avaliacoes_hotel a
JOIN usuarios u ON a.usuario_id = u.id
WHERE a.hotel_id = 'id_do_hotel'
ORDER BY a.created_at DESC;

-- 9. Consulta para obter o número de reservas por status
SELECT 
  status,
  COUNT(*) as quantidade
FROM reservas_hotel
GROUP BY status;

-- 10. Consulta para obter hotéis com melhor classificação
SELECT 
  h.*,
  COALESCE(
    (SELECT AVG(a.classificacao) FROM avaliacoes_hotel a WHERE a.hotel_id = h.id),
    0
  ) as media_classificacao
FROM hoteis h
ORDER BY media_classificacao DESC;

-- 11. Consulta para verificar disponibilidade de quartos em um período
SELECT 
  q.*,
  (q.quantidade_disponivel - COALESCE(
    (
      SELECT COUNT(*) 
      FROM reservas_hotel rh 
      WHERE rh.quarto_id = q.id 
      AND rh.status IN ('confirmada', 'pendente')
      AND (
        (rh.data_checkin <= 'data_checkout' AND rh.data_checkout >= 'data_checkin')
      )
    ), 0
  )) as quartos_disponiveis
FROM quartos q
WHERE q.hotel_id = 'id_do_hotel'
HAVING quartos_disponiveis > 0;

-- 12. Consulta para obter o perfil completo de um usuário
SELECT 
  u.*,
  (
    SELECT COUNT(*) FROM reservas_hotel rh WHERE rh.usuario_id = u.id
  ) as total_reservas_hotel,
  (
    SELECT COUNT(*) FROM reservas_carro rc WHERE rc.usuario_id = u.id
  ) as total_reservas_carro,
  (
    SELECT COUNT(*) FROM reservas_pacote rp WHERE rp.usuario_id = u.id
  ) as total_reservas_pacote
FROM usuarios u
WHERE u.id = 'id_do_usuario';

-- 13. Consulta para obter as reservas de hotel mais recentes
SELECT 
  rh.*,
  u.nome as nome_usuario,
  u.sobrenome as sobrenome_usuario,
  h.nome as nome_hotel,
  q.tipo as tipo_quarto
FROM reservas_hotel rh
JOIN usuarios u ON rh.usuario_id = u.id
JOIN quartos q ON rh.quarto_id = q.id
JOIN hoteis h ON q.hotel_id = h.id
ORDER BY rh.created_at DESC
LIMIT 10;

-- 14. Consulta para obter o faturamento total por mês
SELECT 
  DATE_TRUNC('month', rh.data_checkin) as mes,
  SUM(rh.valor_total) as faturamento_hoteis,
  (
    SELECT SUM(rc.valor_total) 
    FROM reservas_carro rc 
    WHERE DATE_TRUNC('month', rc.data_retirada) = DATE_TRUNC('month', rh.data_checkin)
  ) as faturamento_carros
FROM reservas_hotel rh
WHERE rh.status = 'confirmada'
GROUP BY mes
ORDER BY mes DESC;

-- 15. Consulta para buscar hotéis por cidade com filtro de preço
SELECT 
  h.*,
  MIN(q.preco_noite) as preco_minimo,
  (
    SELECT json_agg(i.*) 
    FROM imagens_hotel i 
    WHERE i.hotel_id = h.id
  ) as imagens
FROM hoteis h
JOIN quartos q ON q.hotel_id = h.id
WHERE h.cidade ILIKE '%nome_cidade%'
AND q.preco_noite BETWEEN valor_minimo AND valor_maximo
GROUP BY h.id
ORDER BY preco_minimo; 