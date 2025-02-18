const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const TemplateTermo = sequelize.define('TemplateTermo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    conteudo_template: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'templates_termos',
    timestamps: false
});

module.exports = TemplateTermo;