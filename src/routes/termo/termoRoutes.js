const express = require('express');
const router = express.Router();
const termoController = require('../../controllers/termo/termoController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsTermo
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);
router.use(verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV));

// === Rotas de leitura (GET) ===
router.get('/', termoController.listar);
router.get('/filtros', validarQueryParamsTermo, termoController.buscarPorFiltros);
router.get('/:id', validarIds, termoController.buscarPorId);

// === Rotas de criação (POST) ===
router.post('/', termoController.criar);

// === Rotas de atualização (PUT) ===
router.put('/:id', validarIds, termoController.atualizar);

// === Rotas de exclusão (DELETE) ===
router.delete('/:id', validarIds, termoController.remover);


module.exports = router;