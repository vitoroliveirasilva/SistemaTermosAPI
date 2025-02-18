CREATE TABLE `auth_providers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `equipamento_status` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `term_types` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `term_status` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `movement_actions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `filiais` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `endereco` VARCHAR(255),
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `categorias` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `descricao` VARCHAR(255),
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `modelos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `categoria_id` INT NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `modelo` VARCHAR(100) NOT NULL,
  `descricao` TEXT,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `usuarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `filial_id` INT NOT NULL,
  `auth_provider_id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `senha` VARCHAR(255),
  `telefone` VARCHAR(20),
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `equipamentos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `modelo_id` INT NOT NULL,
  `filial_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `numero_serie` VARCHAR(50) UNIQUE NOT NULL,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `termos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `equipamento_id` INT NOT NULL,
  `criador_id` INT NOT NULL,
  `tipo_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `data_criacao` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `data_assinatura` TIMESTAMP,
  `observacoes` TEXT
);

CREATE TABLE `historico_movimentacoes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `equipamento_id` INT NOT NULL,
  `usuario_id` INT,
  `acao_id` INT NOT NULL,
  `data_movimentacao` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `observacoes` TEXT
);

CREATE TABLE `templates_termos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `conteudo_template` TEXT NOT NULL,
  `criado_em` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `termos_gerados` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `termo_id` INT NOT NULL,
  `template_id` INT NOT NULL,
  `caminho_pdf` VARCHAR(255) NOT NULL,
  `data_geracao` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE `modelos` ADD CONSTRAINT `fk_modelos_categorias` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuarios_filiais` FOREIGN KEY (`filial_id`) REFERENCES `filiais` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuarios_authproviders` FOREIGN KEY (`auth_provider_id`) REFERENCES `auth_providers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `equipamentos` ADD CONSTRAINT `fk_equipamentos_modelos` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `equipamentos` ADD CONSTRAINT `fk_equipamentos_filiais` FOREIGN KEY (`filial_id`) REFERENCES `filiais` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `equipamentos` ADD CONSTRAINT `fk_equipamentos_status` FOREIGN KEY (`status_id`) REFERENCES `equipamento_status` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `termos` ADD CONSTRAINT `fk_termos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `termos` ADD CONSTRAINT `fk_termos_equipamento` FOREIGN KEY (`equipamento_id`) REFERENCES `equipamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `termos` ADD CONSTRAINT `fk_termos_criador` FOREIGN KEY (`criador_id`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `termos` ADD CONSTRAINT `fk_termos_tipo` FOREIGN KEY (`tipo_id`) REFERENCES `term_types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `termos` ADD CONSTRAINT `fk_termos_status` FOREIGN KEY (`status_id`) REFERENCES `term_status` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `historico_movimentacoes` ADD CONSTRAINT `fk_hist_equipamento` FOREIGN KEY (`equipamento_id`) REFERENCES `equipamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `historico_movimentacoes` ADD CONSTRAINT `fk_hist_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `historico_movimentacoes` ADD CONSTRAINT `fk_hist_acao` FOREIGN KEY (`acao_id`) REFERENCES `movement_actions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `termos_gerados` ADD FOREIGN KEY (`termo_id`) REFERENCES `termos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `termos_gerados` ADD FOREIGN KEY (`template_id`) REFERENCES `templates_termos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `usuarios` ADD FOREIGN KEY (`criado_em`) REFERENCES `auth_providers` (`id`);

ALTER TABLE `term_types` ADD FOREIGN KEY (`id`) REFERENCES `term_types` (`nome`);
