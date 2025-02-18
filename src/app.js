const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/errorMiddleware');

// Para leitura de JSON no body das requisições
app.use(express.json());

// Middleware de log (caso tenha)
const {
  logger
} = require('./middlewares');
if (logger) app.use(logger);

// Definição das rotas principais
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Middleware global para tratamento de erros
app.use(errorHandler);

module.exports = app;