const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validarId = require('../middlewares/validarIdMiddleware');

router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);
router.get('/:id', validarId, usuarioController.buscarPorId);
router.put('/:id', validarId, usuarioController.atualizar);
router.delete('/:id', validarId, usuarioController.remover);

module.exports = router;