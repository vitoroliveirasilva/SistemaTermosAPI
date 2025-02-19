const express = require('express');
const router = express.Router();
const filialController = require('../controllers/filialController');
const {
    validarId,
    validarQueryParamsFiliais
} = require('../middlewares');

router.post('/', filialController.criar);
router.get('/', filialController.listar);
router.get('/filtros', validarQueryParamsFiliais, filialController.buscarPorFiltros);
router.get('/:id', validarId, filialController.buscarPorId);
router.put('/:id', validarId, filialController.atualizar);
router.delete('/:id', validarId, filialController.remover);

module.exports = router;