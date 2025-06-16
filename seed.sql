-- Inserção de dados de exemplo

-- Inserir usuários
INSERT INTO usuarios (id, email, nome, sobrenome, telefone, tipo_usuario)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@akiviagens.com', 'Admin', 'Sistema', '+244 923 456 789', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'hotel@akiviagens.com', 'Gestor', 'Hotel', '+244 923 123 456', 'hotel'),
  ('33333333-3333-3333-3333-333333333333', 'cliente@exemplo.com', 'Cliente', 'Exemplo', '+244 923 789 123', 'cliente');

-- Inserir hotéis
INSERT INTO hoteis (id, nome, descricao, endereco, cidade, estado, pais, classificacao, comodidades, usuario_id)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Hotel Luanda Palace', 'Hotel de luxo no centro de Luanda com vista para o mar', 'Av. 4 de Fevereiro, 23', 'Luanda', 'Luanda', 'Angola', 5, ARRAY['Wi-Fi', 'Piscina', 'Academia', 'Restaurante', 'Bar', 'Estacionamento'], '22222222-2222-2222-2222-222222222222'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Benguela Resort', 'Resort à beira-mar com ampla área de lazer', 'Praia Morena, 100', 'Benguela', 'Benguela', 'Angola', 4, ARRAY['Wi-Fi', 'Piscina', 'Praia Privativa', 'Restaurante', 'Bar'], '22222222-2222-2222-2222-222222222222');

-- Inserir quartos
INSERT INTO quartos (id, hotel_id, tipo, descricao, capacidade, preco_noite, quantidade_disponivel, comodidades)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Standard', 'Quarto confortável com vista para a cidade', 2, 150.00, 10, ARRAY['Ar-condicionado', 'TV', 'Frigobar', 'Wi-Fi']),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Luxo', 'Quarto espaçoso com vista para o mar', 2, 250.00, 5, ARRAY['Ar-condicionado', 'TV', 'Frigobar', 'Wi-Fi', 'Banheira de Hidromassagem']),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Standard', 'Quarto com varanda e vista para o jardim', 2, 120.00, 15, ARRAY['Ar-condicionado', 'TV', 'Frigobar', 'Wi-Fi']),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Suíte', 'Suíte com sala de estar e vista para o mar', 4, 300.00, 3, ARRAY['Ar-condicionado', 'TV', 'Frigobar', 'Wi-Fi', 'Sala de Estar', 'Varanda']);

-- Inserir imagens de hotéis (URLs fictícias)
INSERT INTO imagens_hotel (hotel_id, url, descricao, ordem)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/hoteis/hotel_luanda_1.jpg', 'Fachada do Hotel Luanda Palace', 1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/hoteis/hotel_luanda_2.jpg', 'Lobby do Hotel Luanda Palace', 2),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/hoteis/benguela_resort_1.jpg', 'Vista aérea do Benguela Resort', 1),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/hoteis/benguela_resort_2.jpg', 'Piscina do Benguela Resort', 2);

-- Inserir imagens de quartos (URLs fictícias)
INSERT INTO imagens_quarto (quarto_id, url, descricao, ordem)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/quartos/quarto_standard_luanda_1.jpg', 'Quarto Standard do Hotel Luanda Palace', 1),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/quartos/quarto_luxo_luanda_1.jpg', 'Quarto Luxo do Hotel Luanda Palace', 1),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/quartos/quarto_standard_benguela_1.jpg', 'Quarto Standard do Benguela Resort', 1),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/quartos/suite_benguela_1.jpg', 'Suíte do Benguela Resort', 1);

-- Inserir carros
INSERT INTO carros (id, modelo, marca, ano, tipo, capacidade, preco_diaria, disponivel, descricao)
VALUES
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Corolla', 'Toyota', 2022, 'Sedan', 5, 75.00, true, 'Sedan executivo com ar-condicionado, direção hidráulica e câmbio automático'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Hilux', 'Toyota', 2021, 'Pickup', 5, 120.00, true, 'Caminhonete 4x4 ideal para terrenos acidentados'),
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Tucson', 'Hyundai', 2022, 'SUV', 5, 90.00, true, 'SUV confortável com ar-condicionado, direção hidráulica e câmbio automático');

-- Inserir imagens de carros (URLs fictícias)
INSERT INTO imagens_carro (carro_id, url, descricao, ordem)
VALUES
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/carros/corolla_1.jpg', 'Toyota Corolla frente', 1),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/carros/corolla_2.jpg', 'Toyota Corolla interior', 2),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/carros/hilux_1.jpg', 'Toyota Hilux frente', 1),
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/carros/tucson_1.jpg', 'Hyundai Tucson frente', 1);

-- Inserir salões
INSERT INTO saloes (id, nome, endereco, cidade, estado, pais, capacidade, preco_diaria, comodidades, descricao)
VALUES
  ('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Salão Diamante', 'Av. Revolução de Outubro, 50', 'Luanda', 'Luanda', 'Angola', 200, 500.00, ARRAY['Som', 'Iluminação', 'Ar-condicionado', 'Palco', 'Cozinha'], 'Salão elegante para eventos corporativos e casamentos'),
  ('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'Centro de Convenções Benguela', 'Rua das Palmeiras, 100', 'Benguela', 'Benguela', 'Angola', 500, 800.00, ARRAY['Som', 'Iluminação', 'Ar-condicionado', 'Palco', 'Cozinha', 'Estacionamento'], 'Grande centro de convenções para eventos de grande porte');

-- Inserir imagens de salões (URLs fictícias)
INSERT INTO imagens_salao (salao_id, url, descricao, ordem)
VALUES
  ('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/saloes/salao_diamante_1.jpg', 'Interior do Salão Diamante', 1),
  ('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/saloes/centro_convencoes_benguela_1.jpg', 'Vista do Centro de Convenções Benguela', 1);

-- Inserir pacotes
INSERT INTO pacotes (id, nome, descricao, destino, duracao, preco, inclui, nao_inclui, data_inicio, data_fim, vagas_disponiveis)
VALUES
  ('llllllll-llll-llll-llll-llllllllllll', 'Descobrindo Luanda', 'Pacote completo para conhecer os principais pontos turísticos de Luanda', 'Luanda', 3, 450.00, ARRAY['Hospedagem', 'Café da manhã', 'Transporte', 'Guia turístico'], ARRAY['Almoço', 'Jantar', 'Passeios opcionais'], '2024-12-10', '2024-12-13', 20),
  ('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'Praias de Benguela', 'Pacote de praia com hospedagem à beira-mar', 'Benguela', 5, 750.00, ARRAY['Hospedagem', 'Café da manhã', 'Transporte', 'Passeio de barco'], ARRAY['Almoço', 'Jantar', 'Passeios opcionais'], '2024-11-15', '2024-11-20', 15);

-- Inserir imagens de pacotes (URLs fictícias)
INSERT INTO imagens_pacote (pacote_id, url, descricao, ordem)
VALUES
  ('llllllll-llll-llll-llll-llllllllllll', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/pacotes/luanda_1.jpg', 'Vista da Baía de Luanda', 1),
  ('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'https://eaugzwsrnvyyzslmrgjv.supabase.co/storage/v1/object/public/pacotes/benguela_1.jpg', 'Praia de Benguela', 1);

-- Inserir reservas de hotel
INSERT INTO reservas_hotel (usuario_id, quarto_id, data_checkin, data_checkout, quantidade_hospedes, valor_total, status)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '2024-11-10', '2024-11-13', 2, 450.00, 'confirmada');

-- Inserir reservas de carro
INSERT INTO reservas_carro (usuario_id, carro_id, data_retirada, data_devolucao, local_retirada, local_devolucao, valor_total, status)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'gggggggg-gggg-gggg-gggg-gggggggggggg', '2024-11-10', '2024-11-13', 'Aeroporto de Luanda', 'Aeroporto de Luanda', 225.00, 'confirmada');

-- Inserir avaliações de hotel
INSERT INTO avaliacoes_hotel (usuario_id, hotel_id, classificacao, comentario)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 5, 'Excelente hotel, atendimento impecável e quartos confortáveis.');

-- Inserir promoções
INSERT INTO promocoes (titulo, descricao, tipo, item_id, percentual_desconto, data_inicio, data_fim, codigo, ativo)
VALUES
  ('Verão em Benguela', 'Desconto especial para hospedagem no Benguela Resort', 'hotel', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 15.00, '2024-12-01', '2024-12-31', 'VERAO2024', true);

-- Dados de exemplo para o sistema

-- Inserir hotéis de exemplo
INSERT INTO public.hoteis (id, nome, descricao, endereco, cidade, estrelas, preco_minimo, 
                          tem_wifi, tem_piscina, tem_restaurante, tem_estacionamento, tem_academia, 
                          avaliacao_media)
VALUES
  (gen_random_uuid(), 'Hotel Presidente', 'Hotel de luxo no centro de Luanda', 'Largo 4 de Fevereiro, 3', 'Luanda', 5, 35000, 
   true, true, true, true, true, 4.8),
  (gen_random_uuid(), 'Talatona Convention Hotel', 'Moderno hotel de negócios', 'Rua do Talatona, 12', 'Luanda', 5, 42000, 
   true, true, true, true, true, 4.7),
  (gen_random_uuid(), 'Hotel Baía', 'Vista espetacular da Baía de Benguela', 'Avenida 4 de Fevereiro, 123', 'Benguela', 4, 28000, 
   true, true, true, true, false, 4.5),
  (gen_random_uuid(), 'Pousada Lubango', 'Aconchegante pousada familiar', 'Rua dos Coqueiros, 45', 'Lubango', 3, 22000, 
   true, false, true, true, false, 4.3),
  (gen_random_uuid(), 'Resort Mussulo', 'Resort exclusivo na Ilha do Mussulo', 'Ilha do Mussulo, Setor 5', 'Luanda', 5, 65000, 
   true, true, true, true, true, 4.9),
  (gen_random_uuid(), 'Hotel Central', 'Localização privilegiada no centro', 'Avenida Central, 78', 'Huambo', 4, 25000, 
   true, false, true, true, false, 4.4);

-- Obter IDs dos hotéis inseridos para usar nas próximas inserções
DO $$
DECLARE
  hotel_presidente_id UUID;
  talatona_id UUID;
  hotel_baia_id UUID;
  pousada_lubango_id UUID;
  resort_mussulo_id UUID;
  hotel_central_id UUID;
BEGIN
  SELECT id INTO hotel_presidente_id FROM public.hoteis WHERE nome = 'Hotel Presidente' LIMIT 1;
  SELECT id INTO talatona_id FROM public.hoteis WHERE nome = 'Talatona Convention Hotel' LIMIT 1;
  SELECT id INTO hotel_baia_id FROM public.hoteis WHERE nome = 'Hotel Baía' LIMIT 1;
  SELECT id INTO pousada_lubango_id FROM public.hoteis WHERE nome = 'Pousada Lubango' LIMIT 1;
  SELECT id INTO resort_mussulo_id FROM public.hoteis WHERE nome = 'Resort Mussulo' LIMIT 1;
  SELECT id INTO hotel_central_id FROM public.hoteis WHERE nome = 'Hotel Central' LIMIT 1;

  -- Inserir quartos para o Hotel Presidente
  INSERT INTO public.quartos (id, hotel_id, nome, descricao, preco_noite, capacidade, 
                             quantidade_disponivel, tipo_cama, tamanho_m2,
                             tem_ar_condicionado, tem_tv, tem_frigobar, tem_cofre)
  VALUES
    (gen_random_uuid(), hotel_presidente_id, 'Quarto Standard', 'Confortável quarto com vista para a cidade', 35000, 2, 10, 
     'Queen', 25, true, true, true, true),
    (gen_random_uuid(), hotel_presidente_id, 'Quarto Deluxe', 'Espaçoso quarto com vista para o mar', 45000, 2, 8, 
     'King', 35, true, true, true, true),
    (gen_random_uuid(), hotel_presidente_id, 'Suite Executiva', 'Suite luxuosa com sala de estar separada', 65000, 3, 5, 
     'King', 50, true, true, true, true);

  -- Inserir quartos para o Talatona Convention Hotel
  INSERT INTO public.quartos (id, hotel_id, nome, descricao, preco_noite, capacidade, 
                             quantidade_disponivel, tipo_cama, tamanho_m2,
                             tem_ar_condicionado, tem_tv, tem_frigobar, tem_cofre)
  VALUES
    (gen_random_uuid(), talatona_id, 'Quarto Business', 'Ideal para viagens de negócios', 42000, 2, 15, 
     'Queen', 28, true, true, true, true),
    (gen_random_uuid(), talatona_id, 'Suite Premium', 'Suite elegante com área de trabalho', 58000, 2, 10, 
     'King', 40, true, true, true, true),
    (gen_random_uuid(), talatona_id, 'Suite Presidencial', 'Nossa melhor acomodação', 95000, 4, 2, 
     'King', 80, true, true, true, true);

  -- Inserir quartos para os outros hotéis
  INSERT INTO public.quartos (id, hotel_id, nome, descricao, preco_noite, capacidade, 
                             quantidade_disponivel, tipo_cama, tamanho_m2,
                             tem_ar_condicionado, tem_tv, tem_frigobar, tem_cofre)
  VALUES
    (gen_random_uuid(), hotel_baia_id, 'Quarto Vista Mar', 'Quarto com vista para o oceano', 28000, 2, 12, 
     'Queen', 22, true, true, true, false),
    (gen_random_uuid(), hotel_baia_id, 'Suite Familiar', 'Ideal para famílias', 38000, 4, 6, 
     'Duas Queens', 45, true, true, true, false),
    
    (gen_random_uuid(), pousada_lubango_id, 'Quarto Standard', 'Aconchegante e confortável', 22000, 2, 8, 
     'Queen', 20, true, true, false, false),
    (gen_random_uuid(), pousada_lubango_id, 'Quarto Duplo', 'Com duas camas de solteiro', 22000, 2, 6, 
     'Duas Solteiro', 20, true, true, false, false),
    
    (gen_random_uuid(), resort_mussulo_id, 'Bangalô Praia', 'Acesso direto à praia', 65000, 2, 10, 
     'King', 40, true, true, true, true),
    (gen_random_uuid(), resort_mussulo_id, 'Villa Familiar', 'Villa completa com 2 quartos', 95000, 4, 5, 
     'King e Duas Queens', 80, true, true, true, true),
    
    (gen_random_uuid(), hotel_central_id, 'Quarto Econômico', 'Opção econômica e confortável', 25000, 2, 10, 
     'Queen', 18, true, true, false, false),
    (gen_random_uuid(), hotel_central_id, 'Quarto Superior', 'Mais espaço e conforto', 32000, 2, 8, 
     'Queen', 25, true, true, true, true);
END $$;

-- Inserir carros de exemplo
INSERT INTO public.carros (id, marca, modelo, ano, descricao, preco_diaria, localizacao, 
                          tipo_transmissao, tipo_combustivel, numero_portas, 
                          capacidade_passageiros, tem_ar_condicionado, quantidade_disponivel, avaliacao_media)
VALUES
  (gen_random_uuid(), 'Toyota', 'Corolla', 2022, 'Carro econômico e confiável', 25000, 'Luanda', 
   'Automático', 'Gasolina', 4, 5, true, 5, 4.8),
  (gen_random_uuid(), 'Hyundai', 'Tucson', 2021, 'SUV moderno para toda família', 35000, 'Luanda', 
   'Automático', 'Gasolina', 5, 5, true, 3, 4.7),
  (gen_random_uuid(), 'Toyota', 'Hilux', 2022, 'Pick-up robusta para qualquer terreno', 45000, 'Benguela', 
   'Manual', 'Diesel', 4, 5, true, 2, 4.9),
  (gen_random_uuid(), 'Honda', 'Civic', 2021, 'Sedan elegante e econômico', 28000, 'Luanda', 
   'Automático', 'Gasolina', 4, 5, true, 4, 4.6),
  (gen_random_uuid(), 'Mitsubishi', 'Pajero', 2020, 'SUV de luxo para aventuras', 50000, 'Lubango', 
   'Automático', 'Diesel', 5, 7, true, 2, 4.8),
  (gen_random_uuid(), 'Nissan', 'Sentra', 2021, 'Sedan compacto e eficiente', 22000, 'Huambo', 
   'Automático', 'Gasolina', 4, 5, true, 3, 4.5);

-- Inserir salões de exemplo
INSERT INTO public.saloes (id, nome, descricao, endereco, cidade, capacidade, preco_diaria, 
                          tem_ar_condicionado, tem_estacionamento, tem_wifi, tem_palco, 
                          tem_som, tem_iluminacao, avaliacao_media)
VALUES
  (gen_random_uuid(), 'Salão Crystal', 'Salão elegante para casamentos e eventos', 'Av. Revolução de Outubro, 112', 'Luanda', 
   200, 150000, true, true, true, true, true, true, 4.9),
  (gen_random_uuid(), 'Centro de Eventos Marginal', 'Vista espetacular da Baía de Luanda', 'Av. 4 de Fevereiro, 78', 'Luanda', 
   300, 200000, true, true, true, true, true, true, 4.8),
  (gen_random_uuid(), 'Salão Tropical', 'Ambiente tropical para festas ao ar livre', 'Rua das Palmeiras, 45', 'Benguela', 
   150, 80000, false, true, true, false, true, true, 4.6),
  (gen_random_uuid(), 'Palace Hall', 'Salão de luxo no coração de Lubango', 'Av. Principal, 230', 'Lubango', 
   250, 120000, true, true, true, true, true, true, 4.7),
  (gen_random_uuid(), 'Espaço Rural', 'Ambiente rural para eventos únicos', 'Estrada Nacional 354, km 12', 'Huambo', 
   180, 95000, false, true, false, false, true, true, 4.5),
  (gen_random_uuid(), 'Salão Imperial', 'O maior e mais luxuoso salão da cidade', 'Av. Ho Chi Min, 45', 'Luanda', 
   400, 250000, true, true, true, true, true, true, 4.9);

-- Inserir pacotes turísticos de exemplo
INSERT INTO public.pacotes (id, nome, descricao, destino_principal, preco, duracao_dias, 
                           inclui, min_pessoas, max_pessoas, avaliacao_media)
VALUES
  (gen_random_uuid(), 'Kalandula Falls Adventure', 'Explore as majestosas Quedas de Kalandula', 'Malanje', 
   85000, 3, 'Transporte, Hospedagem, Refeições, Guia', 2, 8, 4.9),
  (gen_random_uuid(), 'Safari Kissama', 'Safari no Parque Nacional da Kissama', 'Bengo', 
   120000, 2, 'Safari, Alojamento, Refeições', 4, 12, 4.8),
  (gen_random_uuid(), 'Deserto do Namibe', 'Aventura no deserto e dunas do Namibe', 'Namibe', 
   150000, 4, '4x4, Camping, Guia especializado', 2, 6, 4.7),
  (gen_random_uuid(), 'Praias de Benguela', 'Relaxe nas belas praias de Benguela', 'Benguela', 
   65000, 2, 'Hotel, Passeios, Refeições', 2, 10, 4.6),
  (gen_random_uuid(), 'Serra da Leba', 'Trekking na famosa Serra da Leba', 'Lubango', 
   95000, 3, 'Trekking, Hospedagem, Guia', 2, 8, 4.8),
  (gen_random_uuid(), 'Cidade Histórica M''banza Kongo', 'Descubra a história do Reino do Kongo', 'Zaire', 
   75000, 2, 'Guia histórico, Transporte, Almoço', 4, 15, 4.7); 