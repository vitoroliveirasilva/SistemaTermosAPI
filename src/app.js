const express = require('express');
const setupSwagger = require('./swagger/swaggerDocs');
const routes = require('./routes');
const {
  errorHandler
} = require('./middlewares');

// Configurações externas
const cors = require('./config/cors');
const rateLimit = require('./config/rateLimit');
const applySecurity = require('./config/security');

const app = express();

// Aplica configurações de segurança e limites de requisições
app.use(rateLimit);
app.use(cors);
app.use(express.json());
applySecurity(app);

// Configuração do Swagger
setupSwagger(app);

// Rotas principais
app.use('/api', routes);

// Rota de teste genérica
app.get('/ping', (req, res) => res.send('pong'));

// Middleware global para tratamento de erros
app.use(errorHandler);

module.exports = app;