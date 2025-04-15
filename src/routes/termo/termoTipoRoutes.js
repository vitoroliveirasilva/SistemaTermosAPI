const express = require('express');
const router = express.Router();
const tipoTermoController = require('../../controllers/termo/termoTipoController');
const {
    validarIds,
    validarQueryParamsTermoTipo
} = require('../../middlewares');


// Rotas get
router.get('/', tipoTermoController.listar);
router.get('/filtros', validarQueryParamsTermoTipo, tipoTermoController.buscarPorFiltros);
router.get('/:id', validarIds, tipoTermoController.buscarPorId);

// Rotas post
router.post('/', tipoTermoController.criar);

// Rotas put
router.put('/:id', validarIds, tipoTermoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, tipoTermoController.remover);


module.exports = router;