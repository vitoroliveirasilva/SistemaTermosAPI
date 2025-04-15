const equipamentoService = require('../../services/equipamento/equipamentoService');

class EquipamentoController {
    async criar(req, res, next) {
        try {
            const equipamento = await equipamentoService.criar(req.body);
            return res.status(201).json(equipamento);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const equipamentos = await equipamentoService.listar();
            return res.json(equipamentos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const equipamentos = await equipamentoService.listar(req.query);
            return res.json(equipamentos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const equipamento = await equipamentoService.buscarPorId(req.params.id);
            return res.json(equipamento);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const equipamento = await equipamentoService.atualizar(req.params.id, req.body);
            return res.json(equipamento);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await equipamentoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EquipamentoController();