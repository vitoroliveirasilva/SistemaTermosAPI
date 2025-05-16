const sequelize = require('../config/database');


// === Importação dos models ===

// Autenticação
const RefreshToken = require('./auth/tb_refreshToken');

// Equipamentos
const Categoria = require('./equipamento/tb_categoria');
const Equipamento = require('./equipamento/tb_equipamento');
const EquipamentoStatus = require('./equipamento/tb_equipamentoStatus');
const Modelo  = require('./equipamento/tb_modelo');

// Histórico
const MovimentacaoHistorico = require('./historico/tb_movimentacaoHistorico');
const MovimentacaoAcao = require('./historico/tb_movimentacaoAcao');

// Organizacional
const Filial = require('./organizacional/tb_filial');
const Usuario = require('./organizacional/tb_usuario');

// PDF
const TermoGerado = require('./pdf/tb_termoGerado');
const TermoTemplate = require('./pdf/tb_termoTemplate');

// Termo
const Termo = require('./termo/tb_termo');
const TermoTipo = require('./termo/tb_termoTipo');
const TermoStatus = require('./termo/tb_termoStatus');


// Definição de relacionamentos

// Usuarios e Filiais
Usuario.belongsTo(Filial, {
  foreignKey: 'filial_id'
});
Filial.hasMany(Usuario, {
  foreignKey: 'filial_id'
});

// Usuários e RefreshTokens
RefreshToken.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});
Usuario.hasMany(RefreshToken, {
  foreignKey: 'usuario_id'
});

// Equipamentos e Modelos
Equipamento.belongsTo(Modelo, {
  foreignKey: 'modelo_id'
});
Modelo.hasMany(Equipamento, {
  foreignKey: 'modelo_id'
});

// Equipamentos e Filiais
Equipamento.belongsTo(Filial, {
  foreignKey: 'filial_id'
});
Filial.hasMany(Equipamento, {
  foreignKey: 'filial_id'
});

// Equipamentos e Status
Equipamento.belongsTo(EquipamentoStatus, {
  foreignKey: 'status_id'
});
EquipamentoStatus.hasMany(Equipamento, {
  foreignKey: 'status_id'
});

// Termos e Usuários
Termo.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});
Usuario.hasMany(Termo, {
  foreignKey: 'usuario_id'
});

// Termos e Criador (quem gerou o termo)
Termo.belongsTo(Usuario, {
  foreignKey: 'criador_id',
  as: 'criador'
});
Usuario.hasMany(Termo, {
  foreignKey: 'criador_id',
  as: 'termosCriados'
});

// Termos e Equipamentos
Termo.belongsTo(Equipamento, {
  foreignKey: 'equipamento_id'
});
Equipamento.hasMany(Termo, {
  foreignKey: 'equipamento_id'
});

// Termos e Tipo de Termo
Termo.belongsTo(TermoTipo, {
  foreignKey: 'tipo_id'
});
TermoTipo.hasMany(Termo, {
  foreignKey: 'tipo_id'
});

// Termos e Status
Termo.belongsTo(TermoStatus, {
  foreignKey: 'status_id'
});
TermoStatus.hasMany(Termo, {
  foreignKey: 'status_id'
});

// Histórico de Movimentação
MovimentacaoHistorico.belongsTo(Equipamento, {
  foreignKey: 'equipamento_id'
});
Equipamento.hasMany(MovimentacaoHistorico, {
  foreignKey: 'equipamento_id'
});

MovimentacaoHistorico.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});
Usuario.hasMany(MovimentacaoHistorico, {
  foreignKey: 'usuario_id'
});

MovimentacaoHistorico.belongsTo(MovimentacaoAcao, {
  foreignKey: 'acao_id'
});
MovimentacaoAcao.hasMany(MovimentacaoHistorico, {
  foreignKey: 'acao_id'
});

// Templates de Termos e Termos Gerados
TermoGerado.belongsTo(TermoTipo, {
  foreignKey: 'template_id'
});
TermoTemplate.hasMany(TermoGerado, {
  foreignKey: 'template_id'
});

TermoGerado.belongsTo(Termo, {
  foreignKey: 'termo_id'
});
Termo.hasMany(TermoGerado, {
  foreignKey: 'termo_id'
});


// Array de modelos para facilitar a sincronização
const models = {
  Usuario,
  Filial,
  Categoria,
  Modelo,
  Equipamento,
  Termo,
  MovimentacaoHistorico,
  EquipamentoStatus,
  TermoTipo,
  TermoStatus,
  MovimentacaoAcao,
  TermoTemplate,
  TermoGerado,
  RefreshToken,
};


// Sincronização do banco de dados de forma mais segura
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({
      alter: true
    }); // Atualiza sem perder dados
    console.log('Banco de dados sincronizado.');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
    process.exit(1);
  }
}


module.exports = {
  sequelize,
  ...models,
  syncDatabase,
};