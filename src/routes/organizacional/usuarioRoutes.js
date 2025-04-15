const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/organizacional/usuarioController');
const {
    validarIds,
    validarQueryParamsUsuario
} = require('../../middlewares');


// Rotas get
router.get('/', usuarioController.listar);
router.get('/filtros', validarQueryParamsUsuario, usuarioController.buscarPorFiltros);
router.get('/:id', validarIds, usuarioController.buscarPorId);

// Rotas post
router.post('/', usuarioController.criar);
router.post('/filial/:id/usuarios', validarIds, usuarioController.vincularMultiplosUsuarios);
router.post('/lote', usuarioController.criarEmMassa);

// Rotas put
router.put('/:id/filial/:filialId', validarIds, usuarioController.vincularFilial);
router.put('/:id', validarIds, usuarioController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, usuarioController.remover);


module.exports = router;