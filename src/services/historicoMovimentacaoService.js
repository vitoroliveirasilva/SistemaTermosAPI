const BaseService = require('./baseService');
const historicoMovimentacaoRepository = require('../repositories/historicoMovimentacaoRepository');
const {
    validarUnicidadeHistoricoMovimentacao
} = require('../utils');

class HistoricoMovimentacaoService extends BaseService {
    constructor() {
        super(historicoMovimentacaoRepository, 'HistoricoMovimentacao');
    }

    async criar(dados) {
        await this.#validarUnicidade(dados);
        return super.criar(dados);
    }

    async atualizar(id, dados) {
        await this.#validarUnicidade(dados);
        return super.atualizar(id, dados);
    }

    async #validarUnicidade(dados) {
        const errosValidacao = await validarUnicidadeHistoricoMovimentacao(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new HistoricoMovimentacaoService();