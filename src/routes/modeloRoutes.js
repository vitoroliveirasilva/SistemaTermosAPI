const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');
const {
    validarIds,
    validarQueryParamsModelos
} = require('../middlewares');


// Rotas get
router.get('/', modeloController.listar);
router.get('/filtros', validarQueryParamsModelos, modeloController.buscarPorFiltros);
router.get('/:id', validarIds, modeloController.buscarPorId);

// Rotas post
router.post('/', modeloController.criar);

// Rotas put
router.put('/:id', validarIds, modeloController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, modeloController.remover);


module.exports = router;