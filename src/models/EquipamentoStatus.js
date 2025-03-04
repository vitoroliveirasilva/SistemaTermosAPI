const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const EquipamentoStatus = sequelize.define('EquipamentoStatus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Status de equipamento já cadastrado!'
        },
        validate: {
            notEmpty: {
                msg: "O status de equipamento não pode ser vazio."
            },
            len: {
                args: [2, 50],
                msg: "O status de equipamento deve ter entre 2 a 50 caracteres."
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false
    }
}, {
    tableName: 'equipamento_status',
    timestamps: true,
    underscored: true
});

EquipamentoStatus.displayName = 'Status';

module.exports = EquipamentoStatus;