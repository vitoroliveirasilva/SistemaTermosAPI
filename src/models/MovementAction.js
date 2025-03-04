const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const MovementAction = sequelize.define('MovementAction', {
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
            msg: 'Ação já cadastrada!'
        },
        validate: {
            notEmpty: {
                msg: "O nome da ação não pode ser vazio."
            },
            len: {
                args: [2, 50],
                msg: "O nome da ação deve ter entre 2 a 50 caracteres."
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: {
                args: [0, 100],
                msg: "A descrição da ação deve ter no máximo 255 caracteres."
            }
        }
    }
}, {
    tableName: 'movement_actions',
    timestamps: true,
    underscored: true
});

MovementAction.displayName = 'Ação de movimentação';

module.exports = MovementAction;