const BaseService = require('./baseService');
const acaoMovimentacaoRepository = require('../repositories/acaoMovimentacaoRepository');
const {
    validarUnicidadeAcaoMovimentacao
} = require('../utils');

class AcaoMovimentacaoService extends BaseService {
    constructor() {
        super(acaoMovimentacaoRepository, 'AcaoMovimentacao');
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
        const errosValidacao = await validarUnicidadeAcaoMovimentacao(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new AcaoMovimentacaoService();