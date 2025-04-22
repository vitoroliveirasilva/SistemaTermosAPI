const express = require('express');
const router = express.Router();
const statusEquipamentoController = require('../../controllers/equipamento/equipamentoStatusController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsEquipamentoStatus
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);

// === Rotas de leitura (GET) - permitidas para user, admin e dev
router.get('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), statusEquipamentoController.listar);
router.get('/filtros', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarQueryParamsEquipamentoStatus, statusEquipamentoController.buscarPorFiltros);
router.get('/:id', validarIds, verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), statusEquipamentoController.buscarPorId);

// === Rotas de escrita (POST, PUT, DELETE) - restritas a admin e dev
router.post('/', verificarPermissao(ROLES.ADMIN, ROLES.DEV), statusEquipamentoController.criar);
router.put('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), statusEquipamentoController.atualizar);
router.delete('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), statusEquipamentoController.remover);

module.exports = router;