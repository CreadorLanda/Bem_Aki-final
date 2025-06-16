-- Script para inserir dados fictícios para testes sem depender de IDs de auth.users

-- Primeiro vamos inserir dados que não dependem de usuários
BEGIN;

-- Inserir hotéis sem gerentes por enquanto
INSERT INTO public.hoteis (id, nome, descricao, endereco, cidade, estrelas, preco_minimo, 
                          tem_wifi, tem_piscina, tem_restaurante, tem_estacionamento, tem_academia, 
                          avaliacao_media, latitude, longitude)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Hotel Presidente', 'Hotel de luxo no centro de Luanda', 'Largo 4 de Fevereiro, 3', 'Luanda', 5, 35000, 
   true, true, true, true, true, 4.8, -8.8385, 13.2344),
  ('22222222-2222-2222-2222-222222222222', 'Talatona Convention Hotel', 'Moderno hotel de negócios', 'Rua do Talatona, 12', 'Luanda', 5, 42000, 
   true, true, true, true, true, 4.7, -8.9146, 13.1639),
  ('33333333-3333-3333-3333-333333333333', 'Hotel Baía', 'Vista espetacular da Baía de Benguela', 'Avenida 4 de Fevereiro, 123', 'Benguela', 4, 28000, 
   true, true, true, true, false, 4.5, -12.5823, 13.4134),
  ('44444444-4444-4444-4444-444444444444', 'Pousada Lubango', 'Aconchegante pousada familiar', 'Rua dos Coqueiros, 45', 'Lubango', 3, 22000, 
   true, false, true, true, false, 4.3, -14.9195, 13.5326),
  ('55555555-5555-5555-5555-555555555555', 'Resort Mussulo', 'Resort exclusivo na Ilha do Mussulo', 'Ilha do Mussulo, Setor 5', 'Luanda', 5, 65000, 
   true, true, true, true, true, 4.9, -8.8167, 13.1667),
  ('66666666-6666-6666-6666-666666666666', 'Hotel Central', 'Localização privilegiada no centro', 'Avenida Central, 78', 'Huambo', 4, 25000, 
   true, false, true, true, false, 4.4, -12.7761, 15.7392);

-- Inserir quartos
INSERT INTO public.quartos (id, hotel_id, nome, descricao, preco_noite, capacidade, 
                           quantidade_disponivel, tipo_cama, tamanho_m2,
                           tem_ar_condicionado, tem_tv, tem_frigobar, tem_cofre)
VALUES
  ('aaaaaaaa-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Quarto Standard', 'Confortável quarto com vista para a cidade', 35000, 2, 10, 
   'Queen', 25, true, true, true, true),
  ('aaaaaaaa-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Quarto Deluxe', 'Espaçoso quarto com vista para o mar', 45000, 2, 8, 
   'King', 35, true, true, true, true),
  ('aaaaaaaa-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Suite Executiva', 'Suite luxuosa com sala de estar separada', 65000, 3, 5, 
   'King', 50, true, true, true, true),
  ('bbbbbbbb-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Quarto Business', 'Ideal para viagens de negócios', 42000, 2, 15, 
   'Queen', 28, true, true, true, true),
  ('bbbbbbbb-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Suite Premium', 'Suite elegante com área de trabalho', 58000, 2, 10, 
   'King', 40, true, true, true, true),
  ('cccccccc-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'Quarto Vista Mar', 'Quarto com vista para o oceano', 28000, 2, 12, 
   'Queen', 22, true, true, true, false),
  ('dddddddd-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'Quarto Standard', 'Aconchegante e confortável', 22000, 2, 8, 
   'Queen', 20, true, true, false, false),
  ('eeeeeeee-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'Bangalô Praia', 'Acesso direto à praia', 65000, 2, 10, 
   'King', 40, true, true, true, true),
  ('ffffff00-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', 'Quarto Econômico', 'Opção econômica e confortável', 25000, 2, 10, 
   'Queen', 18, true, true, false, false);

-- Inserir carros sem gerentes por enquanto
INSERT INTO public.carros (id, marca, modelo, ano, descricao, preco_diaria, localizacao, 
                          tipo_transmissao, tipo_combustivel, numero_portas, 
                          capacidade_passageiros, tem_ar_condicionado, quantidade_disponivel, avaliacao_media)
VALUES
  ('77777777-7777-7777-7777-777777777777', 'Toyota', 'Corolla', 2022, 'Carro econômico e confiável', 25000, 'Luanda', 
   'Automático', 'Gasolina', 4, 5, true, 5, 4.8),
  ('88888888-8888-8888-8888-888888888888', 'Hyundai', 'Tucson', 2021, 'SUV moderno para toda família', 35000, 'Luanda', 
   'Automático', 'Gasolina', 5, 5, true, 3, 4.7),
  ('99999999-9999-9999-9999-999999999999', 'Toyota', 'Hilux', 2022, 'Pick-up robusta para qualquer terreno', 45000, 'Benguela', 
   'Manual', 'Diesel', 4, 5, true, 2, 4.9),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Honda', 'Civic', 2021, 'Sedan elegante e econômico', 28000, 'Luanda', 
   'Automático', 'Gasolina', 4, 5, true, 4, 4.6),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Mitsubishi', 'Pajero', 2020, 'SUV de luxo para aventuras', 50000, 'Lubango', 
   'Automático', 'Diesel', 5, 7, true, 2, 4.8);

-- Inserir salões sem gerentes por enquanto
INSERT INTO public.saloes (id, nome, descricao, endereco, cidade, capacidade, preco_diaria, 
                          tem_ar_condicionado, tem_estacionamento, tem_wifi, tem_palco, 
                          tem_som, tem_iluminacao, avaliacao_media, latitude, longitude)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Salão Crystal', 'Salão elegante para casamentos e eventos', 'Av. Revolução de Outubro, 112', 'Luanda', 
   200, 150000, true, true, true, true, true, true, 4.9, -8.8385, 13.2344),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Centro de Eventos Marginal', 'Vista espetacular da Baía de Luanda', 'Av. 4 de Fevereiro, 78', 'Luanda', 
   300, 200000, true, true, true, true, true, true, 4.8, -8.8167, 13.2333),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Salão Tropical', 'Ambiente tropical para festas ao ar livre', 'Rua das Palmeiras, 45', 'Benguela', 
   150, 80000, false, true, true, false, true, true, 4.6, -12.5823, 13.4134),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Palace Hall', 'Salão de luxo no coração de Lubango', 'Av. Principal, 230', 'Lubango', 
   250, 120000, true, true, true, true, true, true, 4.7, -14.9195, 13.5326);

-- Inserir pacotes turísticos
INSERT INTO public.pacotes (id, nome, descricao, destino_principal, preco, duracao_dias, 
                           inclui, min_pessoas, max_pessoas, avaliacao_media)
VALUES
  ('11111111-aaaa-aaaa-aaaa-111111111111', 'Kalandula Falls Adventure', 'Explore as majestosas Quedas de Kalandula', 'Malanje', 
   85000, 3, 'Transporte, Hospedagem, Refeições, Guia', 2, 8, 4.9),
  ('22222222-aaaa-aaaa-aaaa-222222222222', 'Safari Kissama', 'Safari no Parque Nacional da Kissama', 'Bengo', 
   120000, 2, 'Safari, Alojamento, Refeições', 4, 12, 4.8),
  ('33333333-aaaa-aaaa-aaaa-333333333333', 'Deserto do Namibe', 'Aventura no deserto e dunas do Namibe', 'Namibe', 
   150000, 4, '4x4, Camping, Guia especializado', 2, 6, 4.7),
  ('44444444-aaaa-aaaa-aaaa-444444444444', 'Praias de Benguela', 'Relaxe nas belas praias de Benguela', 'Benguela', 
   65000, 2, 'Hotel, Passeios, Refeições', 2, 10, 4.6);

COMMIT;

-- IMPORTANTE: Após executar este script, você precisa:
-- 1. Criar usuários no Supabase Auth (admin, clientes, gerentes)
-- 2. Inserir manualmente os registros na tabela usuarios usando os IDs gerados pelo Supabase Auth
-- 3. Atualizar as tabelas de hoteis, carros e saloes para associar os gerentes corretos

-- Exemplo de como inserir usuários manualmente (substitua os UUIDs pelos IDs reais):
/*
INSERT INTO public.usuarios (id, email, nome, sobrenome, telefone, data_nascimento, cpf, tipo_usuario)
VALUES
  ('ID-DO-ADMIN', 'admin@akiviagens.com', 'Admin', 'Sistema', '+244 923456789', '1990-01-01', '12345678900', 'admin'),
  ('ID-DO-CLIENTE1', 'maria@exemplo.com', 'Maria', 'Silva', '+244 923456790', '1992-05-15', '98765432100', 'cliente'),
  ('ID-DO-CLIENTE2', 'joao@exemplo.com', 'João', 'Santos', '+244 923456791', '1985-10-20', '45678912300', 'cliente'),
  ('ID-DO-GERENTE-HOTEL', 'gerente.hotel@akiviagens.com', 'Carlos', 'Mendes', '+244 923456792', '1988-03-25', '78945612300', 'gerente_hotel'),
  ('ID-DO-GERENTE-CARRO', 'gerente.carro@akiviagens.com', 'Ana', 'Oliveira', '+244 923456793', '1991-07-12', '32165498700', 'gerente_carro'),
  ('ID-DO-GERENTE-SALAO', 'gerente.salao@akiviagens.com', 'Paulo', 'Costa', '+244 923456794', '1987-11-30', '65432198700', 'gerente_salao');
*/

-- Exemplo de como atualizar gerentes (substitua os UUIDs pelos IDs reais):
/*
UPDATE public.hoteis SET gerente_id = 'ID-DO-GERENTE-HOTEL';
UPDATE public.carros SET gerente_id = 'ID-DO-GERENTE-CARRO';
UPDATE public.saloes SET gerente_id = 'ID-DO-GERENTE-SALAO';
*/

-- Inserir imagens (caminhos fictícios, devem ser substituídos por caminhos reais após upload)
INSERT INTO public.imagens_hotel (id, hotel_id, caminho_arquivo, descricao, ordem)
VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'hotel_presidente_1.jpg', 'Fachada do hotel', 1),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'hotel_presidente_2.jpg', 'Lobby', 2),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'hotel_presidente_3.jpg', 'Piscina', 3),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'talatona_1.jpg', 'Fachada do hotel', 1),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'talatona_2.jpg', 'Centro de convenções', 2),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'hotel_baia_1.jpg', 'Vista para o mar', 1),
  (gen_random_uuid(), '44444444-4444-4444-4444-444444444444', 'pousada_lubango_1.jpg', 'Entrada da pousada', 1),
  (gen_random_uuid(), '55555555-5555-5555-5555-555555555555', 'resort_mussulo_1.jpg', 'Vista aérea', 1),
  (gen_random_uuid(), '66666666-6666-6666-6666-666666666666', 'hotel_central_1.jpg', 'Fachada do hotel', 1);

INSERT INTO public.imagens_quarto (id, quarto_id, caminho_arquivo, descricao, ordem)
VALUES
  (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', 'quarto_standard_1.jpg', 'Vista geral do quarto', 1),
  (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', 'quarto_standard_2.jpg', 'Banheiro', 2),
  (gen_random_uuid(), 'aaaaaaaa-2222-2222-2222-222222222222', 'quarto_deluxe_1.jpg', 'Vista geral do quarto', 1),
  (gen_random_uuid(), 'aaaaaaaa-3333-3333-3333-333333333333', 'suite_executiva_1.jpg', 'Sala de estar', 1),
  (gen_random_uuid(), 'bbbbbbbb-1111-1111-1111-111111111111', 'quarto_business_1.jpg', 'Área de trabalho', 1),
  (gen_random_uuid(), 'cccccccc-1111-1111-1111-111111111111', 'quarto_vista_mar_1.jpg', 'Vista para o mar', 1),
  (gen_random_uuid(), 'eeeeeeee-1111-1111-1111-111111111111', 'bangalo_1.jpg', 'Vista para a praia', 1);

INSERT INTO public.imagens_carro (id, carro_id, caminho_arquivo, descricao, ordem)
VALUES
  (gen_random_uuid(), '77777777-7777-7777-7777-777777777777', 'corolla_1.jpg', 'Vista frontal', 1),
  (gen_random_uuid(), '77777777-7777-7777-7777-777777777777', 'corolla_2.jpg', 'Vista traseira', 2),
  (gen_random_uuid(), '88888888-8888-8888-8888-888888888888', 'tucson_1.jpg', 'Vista lateral', 1),
  (gen_random_uuid(), '99999999-9999-9999-9999-999999999999', 'hilux_1.jpg', 'Vista frontal', 1),
  (gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'civic_1.jpg', 'Vista frontal', 1),
  (gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'pajero_1.jpg', 'Vista lateral', 1);

INSERT INTO public.imagens_salao (id, salao_id, caminho_arquivo, descricao, ordem)
VALUES
  (gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'salao_crystal_1.jpg', 'Salão principal', 1),
  (gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'salao_crystal_2.jpg', 'Área de buffet', 2),
  (gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'centro_eventos_1.jpg', 'Vista panorâmica', 1),
  (gen_random_uuid(), 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'salao_tropical_1.jpg', 'Área externa', 1),
  (gen_random_uuid(), 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'palace_hall_1.jpg', 'Entrada principal', 1);

INSERT INTO public.imagens_pacote (id, pacote_id, caminho_arquivo, descricao, ordem)
VALUES
  (gen_random_uuid(), '11111111-aaaa-aaaa-aaaa-111111111111', 'kalandula_1.jpg', 'Quedas de Kalandula', 1),
  (gen_random_uuid(), '22222222-aaaa-aaaa-aaaa-222222222222', 'kissama_1.jpg', 'Animais no safari', 1),
  (gen_random_uuid(), '33333333-aaaa-aaaa-aaaa-333333333333', 'namibe_1.jpg', 'Dunas do deserto', 1),
  (gen_random_uuid(), '44444444-aaaa-aaaa-aaaa-444444444444', 'benguela_praias_1.jpg', 'Praia ao pôr do sol', 1); 