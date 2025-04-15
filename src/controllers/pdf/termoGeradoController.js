const termoGeradoService = require('../../services/pdf/termoGeradoService');

class TermoGeradoController {
    async criar(req, res, next) {
        try {
            const termoGerado = await termoGeradoService.criar(req.body);
            return res.status(201).json(termoGerado);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const termosGerados = await termoGeradoService.listar();
            return res.json(termosGerados);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const termosGerados = await termoGeradoService.listar(req.query);
            return res.json(termosGerados);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const termoGerado = await termoGeradoService.buscarPorId(req.params.id);
            return res.json(termoGerado);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const termoGerado = await termoGeradoService.atualizar(req.params.id, req.body);
            return res.json(termoGerado);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await termoGeradoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TermoGeradoController();