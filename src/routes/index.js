const express = require('express');
const router = express.Router();

// Importação centralizada das rotas
const usuarioRoutes = require('./usuarioRoutes');
const filialRoutes = require('./filialRoutes');
const statusTermoRoutes = require('./statusTermoRoutes');
const categoriaRoutes = require('./categoriaRoutes');

// Definição das rotas
router.use('/usuarios', usuarioRoutes);
router.use('/filiais', filialRoutes);
router.use('/statustermos', statusTermoRoutes);
router.use('/categorias', categoriaRoutes);

module.exports = router;