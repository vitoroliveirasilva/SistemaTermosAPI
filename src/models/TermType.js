const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const TermType = sequelize.define('TermType', {
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
    tableName: 'term_types',
    timestamps: false
});

TermType.displayName = 'Tipo de termo';

module.exports = TermType;