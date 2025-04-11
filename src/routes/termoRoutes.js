const express = require('express');
const router = express.Router();
const termoController = require('../controllers/termoController');
const {
    validarIds,
    validarQueryParamsTermos
} = require('../middlewares');


// Rotas get
router.get('/', termoController.listar);
router.get('/filtros', validarQueryParamsTermos, termoController.buscarPorFiltros);
router.get('/:id', validarIds, termoController.buscarPorId);

// Rotas post
router.post('/', termoController.criar);

// Rotas put
router.put('/:id', validarIds, termoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, termoController.remover);


module.exports = router;