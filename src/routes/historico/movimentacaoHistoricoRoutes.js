const express = require('express');
const router = express.Router();
const historicoMovimentacaoController = require('../../controllers/historico/movimentacaoHistoricoController');
const {
    validarIds,
    validarQueryParamsMovimentacaoHistorico
} = require('../../middlewares');


// Rotas get
router.get('/', historicoMovimentacaoController.listar);
router.get('/filtros', validarQueryParamsMovimentacaoHistorico, historicoMovimentacaoController.buscarPorFiltros);
router.get('/:id', validarIds, historicoMovimentacaoController.buscarPorId);

// Rotas post
router.post('/', historicoMovimentacaoController.criar);

// Rotas put
router.put('/:id', validarIds, historicoMovimentacaoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, historicoMovimentacaoController.remover);


module.exports = router;