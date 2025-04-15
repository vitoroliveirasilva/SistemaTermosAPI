const statusTermoService = require('../../services/termo/termoStatusService');

class StatusTermoController {
    async criar(req, res, next) {
        try {
            const statusTermo = await statusTermoService.criar(req.body);
            return res.status(201).json(statusTermo);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const statusTermos = await statusTermoService.listar();
            return res.json(statusTermos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const statusTermos = await statusTermoService.listar(req.query);
            return res.json(statusTermos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const statusTermo = await statusTermoService.buscarPorId(req.params.id);
            return res.json(statusTermo);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const statusTermo = await statusTermoService.atualizar(req.params.id, req.body);
            return res.json(statusTermo);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await statusTermoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StatusTermoController();