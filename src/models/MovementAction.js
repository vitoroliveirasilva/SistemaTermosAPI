const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const MovementAction = sequelize.define('MovementAction', {
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
    tableName: 'movement_actions',
    timestamps: false
});

MovementAction.displayName = 'Ação de movimentação';

module.exports = MovementAction;