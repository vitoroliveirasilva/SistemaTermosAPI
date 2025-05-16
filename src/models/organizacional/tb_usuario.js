const { DataTypes, Op } = require('sequelize');
const sequelize = require('../../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      args: true,
      msg: 'E-mail já cadastrado!'
    },
    validate: {
      isEmail: {
        msg: 'E-mail inválido!'
      }
    }
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo', 'pendente'),
    allowNull: false,
    defaultValue: 'ativo'
  },
  permissao: {
    type: DataTypes.ENUM('user', 'admin', 'dev'),
    allowNull: false,
    defaultValue: 'user'
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'tb_usuario',
  timestamps: false,

  // 🔐 Aplica filtro e oculta senha por padrão
  defaultScope: {
    attributes: { exclude: ['senha'] },
    where: {
      status: {
        [Op.not]: 'inativo'
      }
    }
  },

  // 🔓 Permite sobrescrever escopo para autenticação
  scopes: {
    withPassword: {
      attributes: {},   // Inclui todos os campos (inclusive senha)
      where: {}         // Remove filtro de status
    },
    todos: {
      where: {}         // Filtro livre sem status
    },
    inativos: {
      where: { status: 'inativo' }
    },
    ativos: {
      where: { status: 'ativo' }
    }
  }
});

Usuario.displayName = 'Usuário';

module.exports = Usuario;
