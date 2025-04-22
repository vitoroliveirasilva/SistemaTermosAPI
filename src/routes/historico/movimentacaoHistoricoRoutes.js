const express = require('express');
const router = express.Router();
const historicoMovimentacaoController = require('../../controllers/historico/movimentacaoHistoricoController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsMovimentacaoHistorico
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);
router.use(verificarPermissao(ROLES.ADMIN, ROLES.DEV));

// === Rotas de leitura (GET) ===
router.get('/', historicoMovimentacaoController.listar);
router.get('/filtros', validarQueryParamsMovimentacaoHistorico, historicoMovimentacaoController.buscarPorFiltros);
router.get('/:id', validarIds, historicoMovimentacaoController.buscarPorId);

// === Rotas de criação (POST) ===
router.post('/', historicoMovimentacaoController.criar);

// === Rotas de atualização (PUT) ===
router.put('/:id', validarIds, historicoMovimentacaoController.atualizar);

// === Rotas de exclusão (DELETE) ===
router.delete('/:id', validarIds, historicoMovimentacaoController.remover);

module.exports = router;