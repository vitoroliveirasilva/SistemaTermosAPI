const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const TermType = sequelize.define('TermType', {
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
            msg: 'Tipo de termo já cadastrado!'
        },
        validate: {
            notEmpty: {
                msg: "O nome do tipo de termo não pode ser vazio."
            },
            len: {
                args: [2, 50],
                msg: "O nome do tipo de termo deve ter entre 2 a 50 caracteres."
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: {
                args: [0, 100],
                msg: "A descrição do tipo de termo deve ter no máximo 255 caracteres."
            }
        }
    }
}, {
    tableName: 'term_types',
    timestamps: true,
    underscored: true
});

TermType.displayName = 'Tipo de termo';

module.exports = TermType;