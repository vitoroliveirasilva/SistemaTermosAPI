const express = require('express');
const router = express.Router();
const acaoMovimentacaoController = require('../../controllers/historico/movimentacaoAcaoController');
const {
    validarIds,
    validarQueryParamsMovimentacaoAcao
} = require('../../middlewares');


// Rotas get
router.get('/', acaoMovimentacaoController.listar);
router.get('/filtros', validarQueryParamsMovimentacaoAcao, acaoMovimentacaoController.buscarPorFiltros);
router.get('/:id', validarIds, acaoMovimentacaoController.buscarPorId);

// Rotas post
router.post('/', acaoMovimentacaoController.criar);

// Rotas put
router.put('/:id', validarIds, acaoMovimentacaoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, acaoMovimentacaoController.remover);


module.exports = router;