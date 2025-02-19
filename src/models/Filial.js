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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O nome da filial não pode ser vazio."
            },
            len: {
                args: [2, 100],
                msg: "O nome deve ter entre 2 e 100 caracteres."
            }
        }
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O endereço não pode ser vazio."
            }
        }
    }
}, {
    tableName: 'filiais',
    timestamps: true, // Habilita createdAt e updatedAt
    underscored: true
});

module.exports = Filial;