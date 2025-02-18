const sequelize = require('../config/database');


// Importação dos modelos
const Usuario = require('./Usuario');
const UsuarioStatus = require('./UsuarioStatus');
const Filial = require('./Filial');
const Categoria = require('./Categoria');
const Modelo = require('./Modelo');
const Equipamento = require('./Equipamento');
const Termo = require('./Termo');
const HistoricoMovimentacao = require('./HistoricoMovimentacao');
const AuthProvider = require('./AuthProvider');
const EquipamentoStatus = require('./EquipamentoStatus');
const TermType = require('./TermType');
const TermStatus = require('./TermStatus');
const MovementAction = require('./MovementAction');
const TemplateTermo = require('./TemplateTermo');
const TermoGerado = require('./TermoGerado');


// Definição de relacionamentos

// Usuários e Status
Usuario.belongsTo(UsuarioStatus, {
  foreignKey: 'status_id'
});
UsuarioStatus.hasMany(Usuario, {
  foreignKey: 'status_id'
});

// Usuarios e Filiais
Usuario.belongsTo(Filial, {
  foreignKey: 'filial_id'
});
Filial.hasMany(Usuario, {
  foreignKey: 'filial_id'
});

// Usuarios e AuthProviders
Usuario.belongsTo(AuthProvider, {
  foreignKey: 'auth_provider_id'
});
AuthProvider.hasMany(Usuario, {
  foreignKey: 'auth_provider_id'
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
Termo.belongsTo(TermType, {
  foreignKey: 'tipo_id'
});
TermType.hasMany(Termo, {
  foreignKey: 'tipo_id'
});

// Termos e Status
Termo.belongsTo(TermStatus, {
  foreignKey: 'status_id'
});
TermStatus.hasMany(Termo, {
  foreignKey: 'status_id'
});

// Histórico de Movimentação
HistoricoMovimentacao.belongsTo(Equipamento, {
  foreignKey: 'equipamento_id'
});
Equipamento.hasMany(HistoricoMovimentacao, {
  foreignKey: 'equipamento_id'
});

HistoricoMovimentacao.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});
Usuario.hasMany(HistoricoMovimentacao, {
  foreignKey: 'usuario_id'
});

HistoricoMovimentacao.belongsTo(MovementAction, {
  foreignKey: 'acao_id'
});
MovementAction.hasMany(HistoricoMovimentacao, {
  foreignKey: 'acao_id'
});

// Templates de Termos e Termos Gerados
TermoGerado.belongsTo(TermType, {
  foreignKey: 'template_id'
});
TemplateTermo.hasMany(TermoGerado, {
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
  UsuarioStatus,
  Filial,
  Categoria,
  Modelo,
  Equipamento,
  Termo,
  HistoricoMovimentacao,
  AuthProvider,
  EquipamentoStatus,
  TermType,
  TermStatus,
  MovementAction,
  TemplateTermo,
  TermoGerado,
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