const {
  Sequelize
} = require('sequelize');
require('dotenv').config();

const {
  DB_DIALECT, // ex.: 'sqlite'
  DB_STORAGE // ex.: './database.sqlite'
} = process.env;

// Cria instância do Sequelize
const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  storage: DB_STORAGE,
  // Descomente se quiser logs SQL no console:
  // logging: console.log,
  // ou desabilite logs:
  logging: false,
});

module.exports = sequelize;