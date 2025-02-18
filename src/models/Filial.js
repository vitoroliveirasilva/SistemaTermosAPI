const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const Filial = sequelize.define('Filial', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'filiais',
    timestamps: false
});

module.exports = Filial;