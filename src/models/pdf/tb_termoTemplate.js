const {
    DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');

const TermoTemplate = sequelize.define('TermoTemplate', {
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
            msg: 'Nome já cadastrado!'
        },
        validate: {
            notEmpty: {
                msg: "O nome do template não pode ser vazio."
            },
            len: {
                args: [2, 50],
                msg: "O nome deve ter entre 2 a 50 caracteres."
            }
        }
    },
    titulo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "O título do template não pode ser vazio."
            },
            len: {
                args: [2, 20],
                msg: "O título deve ter entre 2 a 20 caracteres."
            }
        }
    },
    subtitulo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: false,
        validate: {
            len: {
                args: [2, 50],
                msg: "O subtítulo deve ter entre 2 a 50 caracteres."
            }
        }
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "O conteúdo do template não pode ser vazio."
            },
            len: {
                args: [10, 5000],
                msg: "O conteúdo deve ter entre 10 a 5000 caracteres."
            }
        }
    }
}, {
    tableName: 'tb_termoTemplate',
    timestamps: true,
    underscored: true
});

TermoTemplate.displayName = 'Template de termo';

module.exports = TermoTemplate;