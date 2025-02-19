const filialService = require('../services/filialService');

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
            if (error.status === 404) {
                return res.status(404).json({ erro: error.message });
            }
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
            await filialService.remover(req.params.id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FilialController();