require('dotenv').config();
const app = require('./app');
const {
  syncDatabase
} = require('./models');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await syncDatabase(); // Sincroniza banco de dados
    app.listen(PORT, () => console.info(`Servidor rodando na porta ${PORT}`));
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();