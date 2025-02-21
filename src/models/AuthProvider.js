const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const AuthProvider = sequelize.define('AuthProvider', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    criadoEm: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'auth_providers',
    timestamps: false
});

AuthProvider.displayName = 'Provedor de autenticação';

module.exports = AuthProvider;