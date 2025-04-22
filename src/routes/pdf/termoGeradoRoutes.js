const express = require('express');
const router = express.Router();
const termoGeradoController = require('../../controllers/pdf/termoGeradoController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsTermoGerado
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);

// === Rotas de leitura e escrita (GET, POST, PUT) - permitidas para user, admin e dev
router.get('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), termoGeradoController.listar);
router.get('/filtros', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarQueryParamsTermoGerado, termoGeradoController.buscarPorFiltros);
router.get('/:id', validarIds, verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), termoGeradoController.buscarPorId);
router.post('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), termoGeradoController.criar);
router.put('/:id', validarIds, verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), termoGeradoController.atualizar);

// === Rotas de exclusão (DELETE) - restritas a admin e dev
router.delete('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), termoGeradoController.remover);

module.exports = router;