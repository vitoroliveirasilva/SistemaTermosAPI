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

// PDF
const termoGeradoRoutes = require('./pdf/termoGeradoRoutes');
const termoTemplateRoutes = require('./pdf/termoTemplateRoutes');

// Termo
const termoRoutes = require('./termo/termoRoutes');
const termoStatusRoutes = require('./termo/termoStatusRoutes');
const termoTipoRoutes = require('./termo/termoTipoRoutes');


// === Definição das rotas ===

// Referências (valores fixos ou auxiliares)
router.use('/referencia/equipamento-status', equipamentoStatusRoutes);
router.use('/referencia/termo-status', termoStatusRoutes);
router.use('/referencia/termo-tipo', termoTipoRoutes);
router.use('/referencia/movimentacao-acao', movimentacaoAcaoRoutes);
router.use('/referencia/filiais', filialRoutes);

// PDF (ações e templates)
router.use('/pdf/termos/gerados', termoGeradoRoutes);
router.use('/pdf/termos/templates', termoTemplateRoutes);

// Rotas principais
router.use('/usuarios', usuarioRoutes);
router.use('/equipamentos', equipamentoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/modelos', modeloRoutes);
router.use('/movimentacoes/historico', movimentacaoHistoricoRoutes);
router.use('/termos', termoRoutes);


module.exports = router;