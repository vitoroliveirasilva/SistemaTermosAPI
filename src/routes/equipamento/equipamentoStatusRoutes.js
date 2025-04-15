const express = require('express');
const router = express.Router();
const statusEquipamentoController = require('../../controllers/equipamento/equipamentoStatusController');
const {
    validarIds,
    validarQueryParamsEquipamentoStatus
} = require('../../middlewares');


// Rotas get
router.get('/', statusEquipamentoController.listar);
router.get('/filtros', validarQueryParamsEquipamentoStatus, statusEquipamentoController.buscarPorFiltros);
router.get('/:id', validarIds, statusEquipamentoController.buscarPorId);

// Rotas post
router.post('/', statusEquipamentoController.criar);

// Rotas put
router.put('/:id', validarIds, statusEquipamentoController.atualizar);

// Rotas delete
router.delete('/:id', validarIds, statusEquipamentoController.remover);


module.exports = router;