const express = require('express');
const router = express.Router();
const equipamentoController = require('../../controllers/equipamento/equipamentoController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsEquipamento
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);

// === Rotas de leitura (GET) - permitidas para user, admin e dev
router.get('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), equipamentoController.listar);
router.get('/filtros', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarQueryParamsEquipamento, equipamentoController.buscarPorFiltros);
router.get('/:id', validarIds, verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), equipamentoController.buscarPorId);

// === Rotas de escrita (POST, PUT, DELETE) - restritas a admin e dev
router.post('/', verificarPermissao(ROLES.ADMIN, ROLES.DEV), equipamentoController.criar);
router.put('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), equipamentoController.atualizar);
router.delete('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), equipamentoController.remover);

module.exports = router;