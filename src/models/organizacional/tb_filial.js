const {
    DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');

const Filial = sequelize.define('Filial', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Filial já cadastrada!'
        },
        validate: {
            notEmpty: {
                msg: "O nome da filial não pode ser vazio."
            },
            len: {
                args: [2, 100],
                msg: "O nome deve ter entre 2 a 100 caracteres."
            }
        }
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: {
            args: true,
            msg: 'Endereço já cadastrado!'
        }
    }
}, {
    tableName: 'tb_filial',
    timestamps: true,
    underscored: true
});

Filial.displayName = 'Filial';

module.exports = Filial;