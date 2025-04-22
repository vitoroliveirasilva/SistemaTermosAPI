const express = require('express');
const router = express.Router();
const templateTermoController = require('../../controllers/pdf/termoTemplateController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsTermoTemplate
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);

// === Rotas de leitura (GET) - liberadas para todos os usuários autenticados
router.get('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), templateTermoController.listar);
router.get('/filtros', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarQueryParamsTermoTemplate, templateTermoController.buscarPorFiltros);
router.get('/:id', validarIds, verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), templateTermoController.buscarPorId);

// === Rotas de escrita (POST, PUT, DELETE) - restritas a admin e dev
router.post('/', verificarPermissao(ROLES.ADMIN, ROLES.DEV), templateTermoController.criar);
router.put('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), templateTermoController.atualizar);
router.delete('/:id', validarIds, verificarPermissao(ROLES.ADMIN, ROLES.DEV), templateTermoController.remover);

module.exports = router;