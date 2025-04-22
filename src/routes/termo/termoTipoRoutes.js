const express = require('express');
const router = express.Router();
const tipoTermoController = require('../../controllers/termo/termoTipoController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsTermoTipo
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

router.use(autenticacao);
router.use(verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV));

// === Rotas de leitura (GET) ===
router.get('/', tipoTermoController.listar);
router.get('/filtros', validarQueryParamsTermoTipo, tipoTermoController.buscarPorFiltros);
router.get('/:id', validarIds, tipoTermoController.buscarPorId);

// === Rotas de criação (POST) ===
router.post('/', tipoTermoController.criar);

// === Rotas de atualização (PUT) ===
router.put('/:id', validarIds, tipoTermoController.atualizar);

// === Rotas de exclusão (DELETE) ===
router.delete('/:id', validarIds, tipoTermoController.remover);


module.exports = router;