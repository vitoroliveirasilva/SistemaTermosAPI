const express = require('express');
const router = express.Router();
const filialController = require('../../controllers/organizacional/filialController');
const {
    validarIds,
    validarQueryParamsFilial
} = require('../../middlewares');


// Rotas get
router.get('/', filialController.listar);
router.get('/filtros', validarQueryParamsFilial, filialController.buscarPorFiltros);
router.get('/:id', validarIds, filialController.buscarPorId);

// Rotas post
router.post('/', filialController.criar);

// Rotas put
router.put('/:id', validarIds, filialController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, filialController.remover);


module.exports = router;