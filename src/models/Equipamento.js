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
        unique: {
            args: true,
            msg: 'Número de série já cadastrado!'
        },
        validate: {
            notEmpty: {
                msg: "O número de série não pode ser vazio."
            },
            len: {
                args: [2, 50],
                msg: "O número de série deve ter entre 2 a 50 caracteres."
            }
        }
    },
}, {
    tableName: 'equipamentos',
    timestamps: true,
    underscored: true
});

Equipamento.displayName = 'Equipamento';

module.exports = Equipamento;