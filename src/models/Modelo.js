const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Modelo = sequelize.define('Modelo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id'
        }
    },
    marca: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'modelos',
    timestamps: false
});

Modelo.displayName = 'Modelo';

module.exports = Modelo;