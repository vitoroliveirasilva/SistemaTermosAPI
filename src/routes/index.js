const express = require('express');
const router = express.Router();


// === Importação das rotas ===

// Equipamento
const categoriaRoutes = require('./equipamento/categoriaRoutes');
const equipamentoRoutes = require('./equipamento/equipamentoRoutes');
const equipamentoStatusRoutes = require('./equipamento/equipamentoStatusRoutes');
const modeloRoutes = require('./equipamento/modeloRoutes');

// Histórico
const movimentacaoAcaoRoutes = require('./historico/movimentacaoAcaoRoutes');
const movimentacaoHistoricoRoutes = require('./historico/movimentacaoHistoricoRoutes');

// Organizacional
const filialRoutes = require('./organizacional/filialRoutes');
const usuarioRoutes = require('./organizacional/usuarioRoutes');

// Pdf
const termoGeradoRoutes = require('./pdf/termoGeradoRoutes');
const termoTemplateRoutes = require('./pdf/termoTemplateRoutes');

// Termo
const termoRoutes = require('./termo/termoRoutes');
const termoStatusRoutes = require('./termo/termoStatusRoutes');
const termoTipoRoutes = require('./termo/termoTipoRoutes');


// Definição das rotas
router.use('/categoria', categoriaRoutes);
router.use('/equipamento', equipamentoRoutes);
router.use('/equipamentostatus', equipamentoStatusRoutes);
router.use('/modelo', modeloRoutes);
router.use('/movimentacaoacao', movimentacaoAcaoRoutes);
router.use('/movimentacaohistorico', movimentacaoHistoricoRoutes);
router.use('/filial', filialRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/termogerado', termoGeradoRoutes);
router.use('/termotemplate', termoTemplateRoutes);
router.use('/termo', termoRoutes);
router.use('/termostatus', termoStatusRoutes);
router.use('/termotipo', termoTipoRoutes);


module.exports = router;