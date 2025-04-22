const express = require('express');
const router = express.Router();
const acaoMovimentacaoController = require('../../controllers/historico/movimentacaoAcaoController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsMovimentacaoAcao
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);
router.use(verificarPermissao(ROLES.ADMIN, ROLES.DEV));

// === Rotas de leitura (GET) ===
router.get('/', acaoMovimentacaoController.listar);
router.get('/filtros', validarQueryParamsMovimentacaoAcao, acaoMovimentacaoController.buscarPorFiltros);
router.get('/:id', validarIds, acaoMovimentacaoController.buscarPorId);

// === Rotas de criação (POST) ===
router.post('/', acaoMovimentacaoController.criar);

// === Rotas de atualização (PUT) ===
router.put('/:id', validarIds, acaoMovimentacaoController.atualizar);

// === Rotas de exclusão (DELETE) ===
router.delete('/:id', validarIds, acaoMovimentacaoController.remover);

module.exports = router;