const modeloService = require('../services/modeloService');

class ModeloController {
    async criar(req, res, next) {
        try {
            const modelo = await modeloService.criar(req.body);
            return res.status(201).json(modelo);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const modelos = await modeloService.listar();
            return res.json(modelos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const modelos = await modeloService.listar(req.query);
            return res.json(modelos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const modelo = await modeloService.buscarPorId(req.params.id);
            return res.json(modelo);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const modelo = await modeloService.atualizar(req.params.id, req.body);
            return res.json(modelo);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await modeloService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ModeloController();