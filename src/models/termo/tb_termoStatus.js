const {
    DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');

const TermoStatus = sequelize.define('TermoStatus', {
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
    tableName: 'tb_termoStatus',
    timestamps: true,
    underscored: true
});

TermoStatus.displayName = 'Status';

module.exports = TermoStatus;