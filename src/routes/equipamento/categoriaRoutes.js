const express = require('express');
const router = express.Router();
const categoriaController = require('../../controllers/equipamento/categoriaController');
const {
    validarIds,
    validarQueryParamsCategoria
} = require('../../middlewares');


// Rotas get
router.get('/', categoriaController.listar);
router.get('/filtros', validarQueryParamsCategoria, categoriaController.buscarPorFiltros);
router.get('/:id', validarIds, categoriaController.buscarPorId);

// Rotas post
router.post('/', categoriaController.criar);

// Rotas put
router.put('/:id', validarIds, categoriaController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, categoriaController.remover);


module.exports = router;