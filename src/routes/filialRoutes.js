const express = require('express');
const router = express.Router();
const filialController = require('../controllers/filialController');
const {
    validarIds,
    validarQueryParamsFiliais
} = require('../middlewares');

router.post('/', filialController.criar);
router.get('/', filialController.listar);
router.get('/filtros', validarQueryParamsFiliais, filialController.buscarPorFiltros);
router.get('/:id', validarIds, filialController.buscarPorId);
router.put('/:id', validarIds, filialController.atualizar);
router.delete('/:id', validarIds, filialController.remover);

module.exports = router;