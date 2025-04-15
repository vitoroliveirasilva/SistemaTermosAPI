const express = require('express');
const router = express.Router();
const templateTermoController = require('../../controllers/pdf/termoTemplateController');
const {
    validarIds,
    validarQueryParamsTermoTemplate
} = require('../../middlewares');


// Rotas get
router.get('/', templateTermoController.listar);
router.get('/filtros', validarQueryParamsTermoTemplate, templateTermoController.buscarPorFiltros);
router.get('/:id', validarIds, templateTermoController.buscarPorId);

// Rotas post
router.post('/', templateTermoController.criar);

// Rotas put
router.put('/:id', validarIds, templateTermoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, templateTermoController.remover);


module.exports = router;