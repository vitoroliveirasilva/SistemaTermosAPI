const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const Modelo = require('./Modelo');
const Filial = require('./Filial');

const Equipamento = sequelize.define('Equipamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    modelo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Modelo,
            key: 'id'
        }
    },
    filial_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Filial,
            key: 'id'
        }
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_serie: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'equipamentos',
    timestamps: false
});

module.exports = Equipamento;