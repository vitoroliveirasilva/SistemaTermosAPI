const express = require('express');
const router = express.Router();
const filialController = require('../controllers/filialController');

router.post('/', filialController.criar);
router.get('/', filialController.listar);
router.get('/:id', filialController.buscarPorId);
router.put('/:id', filialController.atualizar);
router.delete('/:id', filialController.remover);

module.exports = router;