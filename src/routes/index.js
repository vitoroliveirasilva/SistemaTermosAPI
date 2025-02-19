const express = require('express');
const router = express.Router();

// Importação centralizada das rotas
const usuarioRoutes = require('./usuarioRoutes');
const filialRoutes = require('./filialRoutes');

// Definição das rotas
router.use('/usuarios', usuarioRoutes);
router.use('/filiais', filialRoutes);

module.exports = router;