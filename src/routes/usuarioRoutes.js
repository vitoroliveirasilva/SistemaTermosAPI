const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {
    validarIds,
    validarQueryParamsUsuarios
} = require('../middlewares');

router.post('/', usuarioController.criar);
router.put('/:id/filial/:filialId', validarIds, usuarioController.vincularFilial);
router.get('/', usuarioController.listar);
router.get('/filtros', validarQueryParamsUsuarios, usuarioController.buscarPorFiltros);
router.get('/:id', validarIds, usuarioController.buscarPorId);
router.put('/:id', validarIds, usuarioController.atualizar);
router.delete('/:id', validarIds, usuarioController.remover);

module.exports = router;