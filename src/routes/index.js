const express = require('express');
const router = express.Router();

// Importação centralizada das rotas
const usuarioRoutes = require('./usuarioRoutes');

// Definição das rotas
router.use('/usuarios', usuarioRoutes);

module.exports = router;