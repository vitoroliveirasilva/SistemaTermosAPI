const filialService = require('../../services/organizacional/filialService');

class FilialController {
    async criar(req, res, next) {
        try {
            const filial = await filialService.criar(req.body);
            return res.status(201).json(filial);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const filiais = await filialService.listar();
            return res.json(filiais);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const filiais = await filialService.listar(req.query);
            return res.json(filiais);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const filial = await filialService.buscarPorId(req.params.id);
            return res.json(filial);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const filial = await filialService.atualizar(req.params.id, req.body);
            return res.json(filial);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await filialService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FilialController();