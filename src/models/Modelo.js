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
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Marca já cadastrada!'
        },
        validate: {
            notEmpty: {
                msg: "O nome da marca não pode ser vazio."
            },
            len: {
                args: [2, 50],
                msg: "O nome da marca deve ter entre 2 a 50 caracteres."
            }
        }
    },
    modelo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Modelo já cadastrado!'
        },
        validate: {
            notEmpty: {
                msg: "O nome do modelo não pode ser vazio."
            },
            len: {
                args: [2, 100],
                msg: "O nome do modelo deve ter entre 2 a 100 caracteres."
            }
        }
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Descrição já cadastrada!'
        }
    }
}, {
    tableName: 'modelos',
    timestamps: true,
    underscored: true
});

Modelo.displayName = 'Modelo';

module.exports = Modelo;