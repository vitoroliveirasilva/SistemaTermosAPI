const express = require('express');
const router = express.Router();
const termoGeradoController = require('../controllers/termoGeradoController');
const {
    validarIds,
    validarQueryParamsTermosGerados
} = require('../middlewares');


// Rotas get
router.get('/', termoGeradoController.listar);
router.get('/filtros', validarQueryParamsTermosGerados, termoGeradoController.buscarPorFiltros);
router.get('/:id', validarIds, termoGeradoController.buscarPorId);

// Rotas post
router.post('/', termoGeradoController.criar);

// Rotas put
router.put('/:id', validarIds, termoGeradoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, termoGeradoController.remover);


module.exports = router;