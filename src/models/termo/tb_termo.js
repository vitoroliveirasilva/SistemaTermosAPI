const {
    DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('../organizacional/tb_usuario');
const Equipamento = require('../equipamento/tb_equipamento');

const Termo = sequelize.define('Termo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    equipamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Equipamento,
            key: 'id'
        }
    },
    criador_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    data_assinatura: {
        type: DataTypes.DATE,
        allowNull: true
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    }
}, {
    tableName: 'termos',
    timestamps: true,
    underscored: true
});

Termo.displayName = 'tb_termo';

module.exports = Termo;