const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const UsuarioStatus = sequelize.define('UsuarioStatus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'usuario_status',
    timestamps: false
});

module.exports = UsuarioStatus;