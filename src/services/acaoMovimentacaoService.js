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
        const registroAtual = await super.buscarPorId(id);
    
        await this.#validarUnicidade(dados, registroAtual.id);
    
        return super.atualizar(id, dados);
    }

    async #validarUnicidade(dados, id = null) {
        const errosValidacao = await validarUnicidadeAcaoMovimentacao(dados, id);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.map(e => e.mensagem).join(', '),
                errors: errosValidacao
            };
        }
    }
}

module.exports = new AcaoMovimentacaoService();