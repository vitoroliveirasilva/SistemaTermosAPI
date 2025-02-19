const express = require('express');
const router = express.Router();
const filialController = require('../controllers/filialController');
const {
    validarId
} = require('../middlewares');

router.post('/', filialController.criar);
router.get('/', filialController.listar);
router.get('/:id', validarId, filialController.buscarPorId);
router.put('/:id', validarId, filialController.atualizar);
router.delete('/:id', validarId, filialController.remover);

module.exports = router;