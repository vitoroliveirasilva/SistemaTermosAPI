const BaseService = require('./baseService');
const termoGeradoRepository = require('../repositories/termoGeradoRepository');
const {
    validarUnicidadeTermoGerado
} = require('../utils');

class TermoGeradoService extends BaseService {
    constructor() {
        super(termoGeradoRepository, 'TermoGerado');
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
        const errosValidacao = await validarUnicidadeTermoGerado(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new TermoGeradoService();