const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O token não pode estar vazio.'
      }
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'O ID do usuário deve ser um número inteiro.' },
      min: { args: [1], msg: 'ID de usuário inválido.' }
    }
  },
  expiracao: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: 'A data de expiração deve ser válida.' }
    }
  }
}, {
  tableName: 'tb_refresh_tokens',
  timestamps: true,
  underscored: true,
  createdAt: 'criado_em',
  updatedAt: false
});

RefreshToken.displayName = 'RefreshToken';

module.exports = RefreshToken;
