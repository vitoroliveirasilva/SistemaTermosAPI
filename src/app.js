const express = require('express');
const app = express();
const routes = require('./routes');
const {
  errorHandler
} = require('../src/middlewares');

// Para leitura de JSON no body das requisições
app.use(express.json());

// Definição das rotas principais
app.use('/api', routes);

// Rota de teste
app.get('/ping', (req, res) => res.send('pong'));

// Middleware global para tratamento de erros
app.use(errorHandler);

module.exports = app;