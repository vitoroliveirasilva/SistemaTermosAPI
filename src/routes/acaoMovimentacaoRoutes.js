const express = require('express');
const router = express.Router();
const acaoMovimentacaoController = require('../controllers/acaoMovimentacaoController');
const {
    validarIds,
    validarQueryParamsAcoesMovimentacoes
} = require('../middlewares');


// Rotas get
router.get('/', acaoMovimentacaoController.listar);
router.get('/filtros', validarQueryParamsAcoesMovimentacoes, acaoMovimentacaoController.buscarPorFiltros);
router.get('/:id', validarIds, acaoMovimentacaoController.buscarPorId);

// Rotas post
router.post('/', acaoMovimentacaoController.criar);

// Rotas put
router.put('/:id', validarIds, acaoMovimentacaoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, acaoMovimentacaoController.remover);


module.exports = router;