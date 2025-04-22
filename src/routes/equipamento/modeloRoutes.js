const express = require('express');
const router = express.Router();
const modeloController = require('../../controllers/equipamento/modeloController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsModelo
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);

// === Rotas de leitura (GET) - permitidas para user, admin e dev
router.get('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), modeloController.listar);
router.get('/filtros', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarQueryParamsModelo, modeloController.buscarPorFiltros);
router.get('/:id', validarIds, verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), modeloController.buscarPorId);

// === Rotas de escrita (POST, PUT, DELETE) - restritas a admin e dev
router.post('/', verificarPermissao(ROLES.ADMIN, ROLES.DEV), modeloController.criar);
router.put('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), modeloController.atualizar);
router.delete('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), modeloController.remover);

module.exports = router;