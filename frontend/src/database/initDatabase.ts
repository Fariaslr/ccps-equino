import { openDatabaseSync } from "expo-sqlite";

export function setupDatabase() {
  const db = openDatabaseSync("ccps.db");

  try {
    db.execSync(`PRAGMA foreign_keys = ON;`);

    db.runSync(`
      CREATE TABLE IF NOT EXISTS usuario (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        cpf TEXT,
        crmv TEXT UNIQUE,
        data_nascimento TEXT,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        telefone TEXT,
        tipo_usuario TEXT NOT NULL -- VETERINARIO ou MAPA
      );
    `);
    db.runSync(`
  CREATE TABLE IF NOT EXISTS tipo (
    id TEXT PRIMARY KEY,
    nome_tipo TEXT
  );
`);

    db.runSync(`
  INSERT OR IGNORE INTO tipo (id, nome_tipo) VALUES
    ('1', 'Cerca perimetral'),
    ('2', 'Localização livre de alagamentos'),
    ('3', 'Sala de Manipulação de Sêmen'),
    ('4', 'Sala de Lavagem e Esterilização'),
    ('5', 'Área de coleta de sêmen'),
    ('6', 'Alojamento dos doadores'),
    ('7', 'Instalação administrativa'),
    ('8', 'Vestiários e Banheiros'),
    ('9', 'Armazenamento de sêmen');
`);

    db.runSync(`
  CREATE TABLE IF NOT EXISTS operacao (
    id TEXT PRIMARY KEY,
    id_ccps TEXT NOT NULL,

    cerca_perimetral_data_aprovacao TEXT,
    cerca_perimetral_validado INTEGER,
    localizacao_livre_alagamento_data_aprovacao TEXT,
    localizacao_livre_alagamento_validado INTEGER,
    sala_manipulacao_semen_data_aprovacao TEXT,
    sala_manipulacao_semen_validado INTEGER,
    sala_lavagem_esterilizacao_data_aprovacao TEXT,
    sala_lavagem_esterilizacao_validado INTEGER,
    area_coleta_semen_data_aprovacao TEXT,
    area_coleta_semen_validado INTEGER,
    alojamento_dadores_data_aprovacao TEXT,
    alojamento_dadores_validado INTEGER,
    instalacao_administrativa_data_aprovacao TEXT,
    instalacao_administrativa_validado INTEGER,
    vestiarios_banheiros_data_aprovacao TEXT,
    vestiarios_banheiros_validado INTEGER,
    armazenamento_semen_data_aprovacao TEXT,
    armazenamento_semen_validado INTEGER,

    data_ultima_atualizacao TEXT,

    FOREIGN KEY (id_ccps) REFERENCES ccps(id) ON DELETE CASCADE
  );
`);

    db.runSync(`
      CREATE TABLE IF NOT EXISTS ccps (
        id TEXT PRIMARY KEY,
        nome_ccps TEXT,
        cnpj TEXT,
        cep TEXT,
        endereco TEXT,
        cidade TEXT,
        estado TEXT,
        veterinario_id TEXT,
        codigo_aprovado TEXT UNIQUE,
        data_validade TEXT,
        FOREIGN KEY (veterinario_id) REFERENCES usuario(id) ON DELETE SET NULL
      );
    `);

    db.runSync(`
      CREATE TABLE IF NOT EXISTS sala (
        id TEXT PRIMARY KEY,
        ccps_id TEXT NOT NULL,
        tipo_id TEXT NOT NULL,
        planta TEXT,
        foto1 TEXT,
        foto2 TEXT,
        foto3 TEXT,
        observacao_veterinario TEXT,
        observacao_avaliador TEXT,
        status_validacao TEXT NOT NULL,
        data_ultima_validacao TEXT,
        codigo_aprovado TEXT UNIQUE,
        FOREIGN KEY (ccps_id) REFERENCES ccps(id) ON DELETE CASCADE,
        FOREIGN KEY (tipo_id) REFERENCES tipo(id) ON DELETE CASCADE
      );
    `);

    db.runSync(`CREATE TABLE IF NOT EXISTS ccpsList (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      ccps_data TEXT
      );`);

    db.runSync(`
      CREATE TABLE IF NOT EXISTS operacao (
        id TEXT PRIMARY KEY,
        id_ccps TEXT NOT NULL,

        cerca_perimetral_data_aprovacao TEXT,
        cerca_perimetral_validado BOOLEAN,
        localizacao_livre_alagamento_data_aprovacao TEXT,
        localizacao_livre_alagamento_validado BOOLEAN,
        sala_manipulacao_semen_data_aprovacao TEXT,
        sala_manipulacao_semen_validado BOOLEAN,
        sala_lavagem_esterilizacao_data_aprovacao TEXT,
        sala_lavagem_esterilizacao_validado BOOLEAN,
        area_coleta_semen_data_aprovacao TEXT,
        area_coleta_semen_validado BOOLEAN,
        alojamento_dadores_data_aprovacao TEXT,
        alojamento_dadores_validado BOOLEAN,
        instalacao_administrativa_data_aprovacao TEXT,
        instalacao_administrativa_validado BOOLEAN,
        vestiarios_banheiros_data_aprovacao TEXT,
        vestiarios_banheiros_validado BOOLEAN,
        armazenamento_semen_data_aprovacao TEXT,
        armazenamento_semen_validado BOOLEAN,

        data_ultima_atualizacao TEXT,

        FOREIGN KEY (id_ccps) REFERENCES ccps(id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    console.error("Erro ao configurar banco de dados:", error);
  }
}

export function populateDatabase() {
  const db = openDatabaseSync("ccps.db");

  try {
    db.runSync(`
      INSERT OR IGNORE INTO usuario (id, nome, cpf, crmv, data_nascimento, email, senha, telefone, tipo_usuario) VALUES
        ('1', 'João Silva', '12345678900', '123456', '1980-05-10', 'joao.silva@vet.com', 'senha123', '11999999999', 'VETERINARIO'),
        ('2', 'Maria Oliveira', '98765432100', '654321', '1985-11-20', 'maria.oliveira@mapa.gov.br', 'senha456', '11988888888', 'MAPA');
    `);

    db.runSync(`
      INSERT OR IGNORE INTO ccps (id, nome_ccps, cnpj, cep, endereco, cidade, estado, veterinario_id, codigo_aprovado, data_validade) VALUES
        ('1', 'CCPS São Paulo', '12345678000199', '01001000', 'Rua A, 123', 'São Paulo', 'SP', '1', 'SP123', '2026-12-31'),
        ('2', 'CCPS Rio de Janeiro', '98765432000188', '20000000', 'Rua B, 456', 'Rio de Janeiro', 'RJ', '2', 'RJ456', '2027-12-31');
    `);

    db.runSync(`
      INSERT OR IGNORE INTO operacao (id, id_ccps, 
        cerca_perimetral_data_aprovacao, cerca_perimetral_validado,
        localizacao_livre_alagamento_data_aprovacao, localizacao_livre_alagamento_validado,
        sala_manipulacao_semen_data_aprovacao, sala_manipulacao_semen_validado,
        sala_lavagem_esterilizacao_data_aprovacao, sala_lavagem_esterilizacao_validado,
        area_coleta_semen_data_aprovacao, area_coleta_semen_validado,
        alojamento_dadores_data_aprovacao, alojamento_dadores_validado,
        instalacao_administrativa_data_aprovacao, instalacao_administrativa_validado,
        vestiarios_banheiros_data_aprovacao, vestiarios_banheiros_validado,
        armazenamento_semen_data_aprovacao, armazenamento_semen_validado,
        data_ultima_atualizacao
      ) VALUES
        ('1', '1',
          '2025-01-01', 1, -- Cerca perimetral
          '2025-01-01', 1, -- Localização livre de alagamentos
          '2025-01-01', 1, -- Sala de manipulação de sêmen
          '2025-01-01', 1, -- Sala de lavagem e esterilização
          '2025-01-01', 1, -- Área de coleta de sêmen
          '2025-01-01', 1, -- Alojamento dos doadores
          '2025-01-01', 1, -- Instalação administrativa
          '2025-01-01', 1, -- Vestiários e banheiros
          '2025-01-01', 1, -- Armazenamento de sêmen
          '2025-04-28'
        ),
        ('2', '2',
          '2025-02-01', 0, -- Cerca perimetral
          '2025-02-01', 1, -- Localização livre de alagamentos
          '2025-02-01', 0, -- Sala de manipulação de sêmen
          '2025-02-01', 1, -- Sala de lavagem e esterilização
          '2025-02-01', 1, -- Área de coleta de sêmen
          '2025-02-01', 0, -- Alojamento dos doadores
          '2025-02-01', 1, -- Instalação administrativa
          '2025-02-01', 0, -- Vestiários e banheiros
          '2025-02-01', 1, -- Armazenamento de sêmen
          '2025-04-28'
        );
    `);

    console.log("Dados de teste inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao popular banco de dados:", error);
  }
}
