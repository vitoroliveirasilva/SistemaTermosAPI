const express = require('express');
const router = express.Router();
const categoriaController = require('../../controllers/equipamento/categoriaController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsCategoria
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);

// === Rotas de leitura (GET) - liberadas para todos os usuários autenticados
router.get('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), categoriaController.listar);
router.get('/filtros', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarQueryParamsCategoria, categoriaController.buscarPorFiltros);
router.get('/:id', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarIds, categoriaController.buscarPorId);

// === Rotas de escrita (POST, PUT, DELETE) - restritas a admin e dev
router.post('/', verificarPermissao(ROLES.ADMIN, ROLES.DEV), categoriaController.criar);
router.put('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), categoriaController.atualizar);
router.delete('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), categoriaController.remover);

module.exports = router;