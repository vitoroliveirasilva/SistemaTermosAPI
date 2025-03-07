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
            msg: 'Status já cadastrado!'
        },
        validate: {
            notEmpty: {
                msg: "O nome do status não pode ser vazio."
            },
            len: {
                args: [2, 100],
                msg: "O nome do status deve ter entre 2 a 100 caracteres."
            }
        }
    }
}, {
    tableName: 'term_status',
    timestamps: true,
    underscored: true
});

TermStatus.displayName = 'Status';

module.exports = TermStatus;