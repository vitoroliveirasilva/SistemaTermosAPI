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
        unique: true
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'equipamento_status',
    timestamps: false
});

EquipamentoStatus.displayName = 'Status';

module.exports = EquipamentoStatus;