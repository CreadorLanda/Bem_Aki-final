-- Ativar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE hoteis ENABLE ROW LEVEL SECURITY;
ALTER TABLE quartos ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagens_hotel ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagens_quarto ENABLE ROW LEVEL SECURITY;
ALTER TABLE carros ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagens_carro ENABLE ROW LEVEL SECURITY;
ALTER TABLE saloes ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagens_salao ENABLE ROW LEVEL SECURITY;
ALTER TABLE pacotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagens_pacote ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_hotel ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_carro ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_salao ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_pacote ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes_hotel ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes_carro ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes_salao ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes_pacote ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE promocoes ENABLE ROW LEVEL SECURITY;

-- Políticas para tabela de usuários
CREATE POLICY "Usuários podem ver seus próprios dados" 
ON usuarios FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os usuários" 
ON usuarios FOR SELECT 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

CREATE POLICY "Usuários podem atualizar seus próprios dados" 
ON usuarios FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Admins podem atualizar qualquer usuário" 
ON usuarios FOR UPDATE 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de hotéis
CREATE POLICY "Qualquer pessoa pode ver hotéis" 
ON hoteis FOR SELECT 
USING (true);

CREATE POLICY "Hotéis podem gerenciar seus próprios dados" 
ON hoteis FOR ALL 
USING (auth.uid() = usuario_id);

CREATE POLICY "Admins podem gerenciar todos os hotéis" 
ON hoteis FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de quartos
CREATE POLICY "Qualquer pessoa pode ver quartos" 
ON quartos FOR SELECT 
USING (true);

CREATE POLICY "Hotéis podem gerenciar seus próprios quartos" 
ON quartos FOR ALL 
USING (auth.uid() IN (
  SELECT usuario_id FROM hoteis WHERE id = quartos.hotel_id
));

CREATE POLICY "Admins podem gerenciar todos os quartos" 
ON quartos FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de imagens de hotéis
CREATE POLICY "Qualquer pessoa pode ver imagens de hotéis" 
ON imagens_hotel FOR SELECT 
USING (true);

CREATE POLICY "Hotéis podem gerenciar suas próprias imagens" 
ON imagens_hotel FOR ALL 
USING (auth.uid() IN (
  SELECT usuario_id FROM hoteis WHERE id = imagens_hotel.hotel_id
));

CREATE POLICY "Admins podem gerenciar todas as imagens de hotéis" 
ON imagens_hotel FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de imagens de quartos
CREATE POLICY "Qualquer pessoa pode ver imagens de quartos" 
ON imagens_quarto FOR SELECT 
USING (true);

CREATE POLICY "Hotéis podem gerenciar imagens de seus quartos" 
ON imagens_quarto FOR ALL 
USING (auth.uid() IN (
  SELECT h.usuario_id FROM hoteis h
  JOIN quartos q ON q.hotel_id = h.id
  WHERE q.id = imagens_quarto.quarto_id
));

CREATE POLICY "Admins podem gerenciar todas as imagens de quartos" 
ON imagens_quarto FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de carros
CREATE POLICY "Qualquer pessoa pode ver carros" 
ON carros FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar todos os carros" 
ON carros FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de imagens de carros
CREATE POLICY "Qualquer pessoa pode ver imagens de carros" 
ON imagens_carro FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar todas as imagens de carros" 
ON imagens_carro FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de salões
CREATE POLICY "Qualquer pessoa pode ver salões" 
ON saloes FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar todos os salões" 
ON saloes FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de imagens de salões
CREATE POLICY "Qualquer pessoa pode ver imagens de salões" 
ON imagens_salao FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar todas as imagens de salões" 
ON imagens_salao FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de pacotes
CREATE POLICY "Qualquer pessoa pode ver pacotes" 
ON pacotes FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar todos os pacotes" 
ON pacotes FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de imagens de pacotes
CREATE POLICY "Qualquer pessoa pode ver imagens de pacotes" 
ON imagens_pacote FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar todas as imagens de pacotes" 
ON imagens_pacote FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de reservas de hotel
CREATE POLICY "Clientes podem ver suas próprias reservas de hotel" 
ON reservas_hotel FOR SELECT 
USING (auth.uid() = usuario_id);

CREATE POLICY "Hotéis podem ver reservas de seus quartos" 
ON reservas_hotel FOR SELECT 
USING (auth.uid() IN (
  SELECT h.usuario_id FROM hoteis h
  JOIN quartos q ON q.hotel_id = h.id
  WHERE q.id = reservas_hotel.quarto_id
));

CREATE POLICY "Clientes podem criar reservas de hotel" 
ON reservas_hotel FOR INSERT 
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem atualizar suas próprias reservas de hotel" 
ON reservas_hotel FOR UPDATE 
USING (auth.uid() = usuario_id AND status = 'pendente');

CREATE POLICY "Hotéis podem atualizar status de reservas" 
ON reservas_hotel FOR UPDATE 
USING (auth.uid() IN (
  SELECT h.usuario_id FROM hoteis h
  JOIN quartos q ON q.hotel_id = h.id
  WHERE q.id = reservas_hotel.quarto_id
));

CREATE POLICY "Admins podem gerenciar todas as reservas de hotel" 
ON reservas_hotel FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de reservas de carro
CREATE POLICY "Clientes podem ver suas próprias reservas de carro" 
ON reservas_carro FOR SELECT 
USING (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem criar reservas de carro" 
ON reservas_carro FOR INSERT 
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem atualizar suas próprias reservas de carro" 
ON reservas_carro FOR UPDATE 
USING (auth.uid() = usuario_id AND status = 'pendente');

CREATE POLICY "Admins podem gerenciar todas as reservas de carro" 
ON reservas_carro FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de reservas de salão
CREATE POLICY "Clientes podem ver suas próprias reservas de salão" 
ON reservas_salao FOR SELECT 
USING (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem criar reservas de salão" 
ON reservas_salao FOR INSERT 
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem atualizar suas próprias reservas de salão" 
ON reservas_salao FOR UPDATE 
USING (auth.uid() = usuario_id AND status = 'pendente');

CREATE POLICY "Admins podem gerenciar todas as reservas de salão" 
ON reservas_salao FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de reservas de pacote
CREATE POLICY "Clientes podem ver suas próprias reservas de pacote" 
ON reservas_pacote FOR SELECT 
USING (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem criar reservas de pacote" 
ON reservas_pacote FOR INSERT 
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem atualizar suas próprias reservas de pacote" 
ON reservas_pacote FOR UPDATE 
USING (auth.uid() = usuario_id AND status = 'pendente');

CREATE POLICY "Admins podem gerenciar todas as reservas de pacote" 
ON reservas_pacote FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de avaliações de hotel
CREATE POLICY "Qualquer pessoa pode ver avaliações de hotel" 
ON avaliacoes_hotel FOR SELECT 
USING (true);

CREATE POLICY "Clientes podem criar e atualizar suas próprias avaliações de hotel" 
ON avaliacoes_hotel FOR ALL 
USING (auth.uid() = usuario_id);

CREATE POLICY "Admins podem gerenciar todas as avaliações de hotel" 
ON avaliacoes_hotel FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de avaliações de carro
CREATE POLICY "Qualquer pessoa pode ver avaliações de carro" 
ON avaliacoes_carro FOR SELECT 
USING (true);

CREATE POLICY "Clientes podem criar e atualizar suas próprias avaliações de carro" 
ON avaliacoes_carro FOR ALL 
USING (auth.uid() = usuario_id);

CREATE POLICY "Admins podem gerenciar todas as avaliações de carro" 
ON avaliacoes_carro FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de avaliações de salão
CREATE POLICY "Qualquer pessoa pode ver avaliações de salão" 
ON avaliacoes_salao FOR SELECT 
USING (true);

CREATE POLICY "Clientes podem criar e atualizar suas próprias avaliações de salão" 
ON avaliacoes_salao FOR ALL 
USING (auth.uid() = usuario_id);

CREATE POLICY "Admins podem gerenciar todas as avaliações de salão" 
ON avaliacoes_salao FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de avaliações de pacote
CREATE POLICY "Qualquer pessoa pode ver avaliações de pacote" 
ON avaliacoes_pacote FOR SELECT 
USING (true);

CREATE POLICY "Clientes podem criar e atualizar suas próprias avaliações de pacote" 
ON avaliacoes_pacote FOR ALL 
USING (auth.uid() = usuario_id);

CREATE POLICY "Admins podem gerenciar todas as avaliações de pacote" 
ON avaliacoes_pacote FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de pagamentos
CREATE POLICY "Clientes podem ver seus próprios pagamentos" 
ON pagamentos FOR SELECT 
USING (auth.uid() = usuario_id);

CREATE POLICY "Clientes podem criar pagamentos" 
ON pagamentos FOR INSERT 
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Admins podem gerenciar todos os pagamentos" 
ON pagamentos FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
));

-- Políticas para tabela de promoções
CREATE POLICY "Qualquer pessoa pode ver promoções" 
ON promocoes FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar todas as promoções" 
ON promocoes FOR ALL 
USING (auth.uid() IN (
  SELECT id FROM usuarios WHERE tipo_usuario = 'admin'
)); 