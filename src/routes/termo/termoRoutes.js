const express = require('express');
const router = express.Router();
const termoController = require('../../controllers/termo/termoController');
const {
    validarIds,
    validarQueryParamsTermo
} = require('../../middlewares');


// Rotas get
router.get('/', termoController.listar);
router.get('/filtros', validarQueryParamsTermo, termoController.buscarPorFiltros);
router.get('/:id', validarIds, termoController.buscarPorId);

// Rotas post
router.post('/', termoController.criar);

// Rotas put
router.put('/:id', validarIds, termoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, termoController.remover);


module.exports = router;