const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const Termo = require('./Termo');
const TemplateTermo = require('./TemplateTermo');

const TermoGerado = sequelize.define('TermoGerado', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    termo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Termo,
            key: 'id'
        }
    },
    template_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TemplateTermo,
            key: 'id'
        }
    },
    caminho_pdf: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    data_geracao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'termos_gerados',
    timestamps: true,
    underscored: true
});

TermoGerado.displayName = 'Termo gerado';

module.exports = TermoGerado;