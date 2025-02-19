const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {
    validarId,
    validarQueryParamsUsuarios
} = require('../middlewares');

router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);
router.get('/filtros', validarQueryParamsUsuarios, usuarioController.buscarPorFiltros);
router.get('/:id', validarId, usuarioController.buscarPorId);
router.put('/:id', validarId, usuarioController.atualizar);
router.delete('/:id', validarId, usuarioController.remover);

module.exports = router;