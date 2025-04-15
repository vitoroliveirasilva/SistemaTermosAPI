const historicoMovimentacaoService = require('../../services/historico/movimentacaoHistoricoService');

class HistoricoMovimentacaoController {
    async criar(req, res, next) {
        try {
            const historicoMovimentacao = await historicoMovimentacaoService.criar(req.body);
            return res.status(201).json(historicoMovimentacao);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const historicoMovimentacoes = await historicoMovimentacaoService.listar();
            return res.json(historicoMovimentacoes);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const historicoMovimentacoes = await historicoMovimentacaoService.listar(req.query);
            return res.json(historicoMovimentacoes);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const historicoMovimentacao = await historicoMovimentacaoService.buscarPorId(req.params.id);
            return res.json(historicoMovimentacao);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const historicoMovimentacao = await historicoMovimentacaoService.atualizar(req.params.id, req.body);
            return res.json(historicoMovimentacao);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await historicoMovimentacaoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HistoricoMovimentacaoController();