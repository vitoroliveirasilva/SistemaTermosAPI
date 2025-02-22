const statusEquipamentoService = require('../services/statusEquipamentoService');

class StatusEquipamentoController {
    async criar(req, res, next) {
        try {
            const statusEquipamento = await statusEquipamentoService.criar(req.body);
            return res.status(201).json(statusEquipamento);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const statusEquipamentos = await statusEquipamentoService.listar();
            return res.json(statusEquipamentos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const statusEquipamentos = await statusEquipamentoService.listar(req.query);
            return res.json(statusEquipamentos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const statusEquipamento = await statusEquipamentoService.buscarPorId(req.params.id);
            return res.json(statusEquipamento);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const statusEquipamento = await statusEquipamentoService.atualizar(req.params.id, req.body);
            return res.json(statusEquipamento);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await statusEquipamentoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StatusEquipamentoController();