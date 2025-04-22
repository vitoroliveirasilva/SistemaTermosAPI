const express = require('express');
const router = express.Router();
const statusTermoController = require('../../controllers/termo/termoStatusController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsTermoStatus
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);
router.use(verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV));

// === Rotas de leitura (GET) ===
router.get('/', statusTermoController.listar);
router.get('/filtros', validarQueryParamsTermoStatus, statusTermoController.buscarPorFiltros);
router.get('/:id', validarIds, statusTermoController.buscarPorId);

// === Rotas de criação (POST) ===
router.post('/', statusTermoController.criar);

// === Rotas de atualização (PUT) ===
router.put('/:id', validarIds, statusTermoController.atualizar);

// === Rotas de exclusão (DELETE) ===
router.delete('/:id', validarIds, statusTermoController.remover);


module.exports = router;