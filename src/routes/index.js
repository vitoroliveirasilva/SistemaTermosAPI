const express = require('express');
const router = express.Router();

// Importação centralizada das rotas
const usuarioRoutes = require('./usuarioRoutes');
const filialRoutes = require('./filialRoutes');
const statusTermoRoutes = require('./statusTermoRoutes');
const templateTermoRoutes = require('./templateTermoRoutes');
const statusEquipamentoRoutes = require('./statusEquipamentoRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const acaoMovimentacaoRoutes = require('./acaoMovimentacaoRoutes');
const tipoTermoRoutes = require('./tipoTermoRoutes');
const equipamentoRoutes = require('./equipamentoRoutes');
const historicoMovimentacaoRoutes = require('./historicoMovimentacaoRoutes');
const modeloRoutes = require('./modeloRoutes');
const termoRoutes = require('./termoRoutes');
const termoGeradoRoutes = require('./termoGeradoRoutes');

// Definição das rotas
router.use('/usuarios', usuarioRoutes);
router.use('/filiais', filialRoutes);
router.use('/statustermos', statusTermoRoutes);
router.use('/templatestermos', templateTermoRoutes);
router.use('/statusequipamentos', statusEquipamentoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/acoesmovimentacoes', acaoMovimentacaoRoutes);
router.use('/tipostermos', tipoTermoRoutes);
router.use('/equipamentos', equipamentoRoutes);
router.use('/historicomovimentacoes', historicoMovimentacaoRoutes);
router.use('/modelos', modeloRoutes);
router.use('/termos', termoRoutes);
router.use('/termosgerados', termoGeradoRoutes);

module.exports = router;