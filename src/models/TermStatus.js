const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const TermStatus = sequelize.define('TermStatus', {
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
            msg: 'Filial já cadastrada!'
        },
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
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'term_status',
    timestamps: true, // Habilita createdAt e updatedAt
    underscored: true
});

TermStatus.displayName = 'Status';

module.exports = TermStatus;