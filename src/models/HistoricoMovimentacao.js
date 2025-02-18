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
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'historico_movimentacoes',
    timestamps: false
});

module.exports = HistoricoMovimentacao;