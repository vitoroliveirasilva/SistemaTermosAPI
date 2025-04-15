const tipoTermoService = require('../../services/termo/termoTipoService');

class TipoTermoController {
    async criar(req, res, next) {
        try {
            const tipoTermo = await tipoTermoService.criar(req.body);
            return res.status(201).json(tipoTermo);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const tiposTermos = await tipoTermoService.listar();
            return res.json(tiposTermos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const tiposTermos = await tipoTermoService.listar(req.query);
            return res.json(tiposTermos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const tipoTermo = await tipoTermoService.buscarPorId(req.params.id);
            return res.json(tipoTermo);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const tipoTermo = await tipoTermoService.atualizar(req.params.id, req.body);
            return res.json(tipoTermo);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await tipoTermoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TipoTermoController();