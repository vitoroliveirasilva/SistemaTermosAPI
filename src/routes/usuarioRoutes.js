const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validarId = require('../middlewares/validarIdMiddleware');

router.post('/', usuarioController.criarUsuario);
router.get('/', usuarioController.listarUsuarios);
router.get('/:id', validarId, usuarioController.obterUsuario);
router.put('/:id', validarId, usuarioController.atualizarUsuario);
router.delete('/:id', validarId, usuarioController.deletarUsuario);

module.exports = router;