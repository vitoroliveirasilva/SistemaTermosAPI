const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamentoController');
const {
    validarIds,
    validarQueryParamsEquipamentos
} = require('../middlewares');


// Rotas get
router.get('/', equipamentoController.listar);
router.get('/filtros', validarQueryParamsEquipamentos, equipamentoController.buscarPorFiltros);
router.get('/:id', validarIds, equipamentoController.buscarPorId);

// Rotas post
router.post('/', equipamentoController.criar);

// Rotas put
router.put('/:id', validarIds, equipamentoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, equipamentoController.remover);


module.exports = router;