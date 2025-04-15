const termoService = require('../../services/termo/termoService');

class TermoController {
    async criar(req, res, next) {
        try {
            const termo = await termoService.criar(req.body);
            return res.status(201).json(termo);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const termos = await termoService.listar();
            return res.json(termos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const termos = await termoService.listar(req.query);
            return res.json(termos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const termo = await termoService.buscarPorId(req.params.id);
            return res.json(termo);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const termo = await termoService.atualizar(req.params.id, req.body);
            return res.json(termo);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await termoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TermoController();