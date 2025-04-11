const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const Equipamento = require('./Equipamento');
const Usuario = require('./Usuario');

const HistoricoMovimentacao = sequelize.define('HistoricoMovimentacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Equipamento,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    acao_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_movimentacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    }
}, {
    tableName: 'historico_movimentacoes',
    timestamps: true,
    underscored: true
});

HistoricoMovimentacao.displayName = 'Histórico de movimentação';

module.exports = HistoricoMovimentacao;