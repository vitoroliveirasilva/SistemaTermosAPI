const express = require('express');
const router = express.Router();
const statusTermoController = require('../controllers/statusTermoController');
const {
    validarIds,
    validarQueryParamsStatusTermo
} = require('../middlewares');


// Rotas get
router.get('/', statusTermoController.listar);
router.get('/filtros', validarQueryParamsStatusTermo, statusTermoController.buscarPorFiltros);
router.get('/:id', validarIds, statusTermoController.buscarPorId);

// Rotas post
router.post('/', statusTermoController.criar);

// Rotas put
router.put('/:id', validarIds, statusTermoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, statusTermoController.remover);


module.exports = router;