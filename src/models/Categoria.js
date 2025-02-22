const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Categoria já cadastrada!'
        },
        validate: {
            notEmpty: {
                msg: "O nome da categoria não pode ser vazio."
            },
            len: {
                args: [2, 50],
                msg: "O nome da categoria deve ter entre 2 e 50 caracteres."
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: {
                args: [0, 100],
                msg: "A descrição da categoria deve ter no máximo 255 caracteres."
            }
        }
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'categorias',
    timestamps: true,
    underscored: true
});

Categoria.displayName = 'Categoria';

module.exports = Categoria;