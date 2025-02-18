const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const TermStatus = sequelize.define('TermStatus', {
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
    tableName: 'term_status',
    timestamps: false
});

module.exports = TermStatus;