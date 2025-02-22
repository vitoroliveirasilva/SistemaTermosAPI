const express = require('express');
const router = express.Router();
const templateTermoController = require('../controllers/templateTermoController');
const {
    validarIds,
    validarQueryParamsTemplatesTermos
} = require('../middlewares');


// Rotas get
router.get('/', templateTermoController.listar);
router.get('/filtros', validarQueryParamsTemplatesTermos, templateTermoController.buscarPorFiltros);
router.get('/:id', validarIds, templateTermoController.buscarPorId);

// Rotas post
router.post('/', templateTermoController.criar);

// Rotas put
router.put('/:id', validarIds, templateTermoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, templateTermoController.remover);


module.exports = router;