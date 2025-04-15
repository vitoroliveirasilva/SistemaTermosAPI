const categoriaService = require('../../services/equipamento/categoriaService');

class CategoriaController {
    async criar(req, res, next) {
        try {
            const categoria = await categoriaService.criar(req.body);
            return res.status(201).json(categoria);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const categorias = await categoriaService.listar();
            return res.json(categorias);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const categorias = await categoriaService.listar(req.query);
            return res.json(categorias);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const categoria = await categoriaService.buscarPorId(req.params.id);
            return res.json(categoria);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const categoria = await categoriaService.atualizar(req.params.id, req.body);
            return res.json(categoria);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await categoriaService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoriaController();