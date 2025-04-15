const acaoMovimentacaoService = require('../../services/historico/movimentacaoAcaoService');

class AcaoMovimentacaoController {
    async criar(req, res, next) {
        try {
            const acaoMovimentacao = await acaoMovimentacaoService.criar(req.body);
            return res.status(201).json(acaoMovimentacao);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const acoesMovimentacoes = await acaoMovimentacaoService.listar();
            return res.json(acoesMovimentacoes);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorFiltros(req, res, next) {
        try {
            const acoesMovimentacoes = await acaoMovimentacaoService.listar(req.query);
            return res.json(acoesMovimentacoes);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const acaoMovimentacao = await acaoMovimentacaoService.buscarPorId(req.params.id);
            return res.json(acaoMovimentacao);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const acaoMovimentacao = await acaoMovimentacaoService.atualizar(req.params.id, req.body);
            return res.json(acaoMovimentacao);
        } catch (error) {
            next(error);
        }
    }

    async remover(req, res, next) {
        try {
            const resultado = await acaoMovimentacaoService.remover(req.params.id);
            return res.status(204).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AcaoMovimentacaoController();