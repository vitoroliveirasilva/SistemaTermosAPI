const templateTermoService = require('../services/templateTermoService');

class TemplateTermoController {
    async criar(req, res, next) {
        try {
            const templateTermo = await templateTermoService.criar(req.body);
            return res.status(201).json(templateTermo);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const templatesTermos = await templateTermoService.listar();
            return res.json(templatesTermos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const templatesTermos = await templateTermoService.listar(req.query);
            return res.json(templatesTermos);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const templateTermo = await templateTermoService.buscarPorId(req.params.id);
            return res.json(templateTermo);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const templateTermo = await templateTermoService.atualizar(req.params.id, req.body);
            return res.json(templateTermo);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await templateTermoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TemplateTermoController();