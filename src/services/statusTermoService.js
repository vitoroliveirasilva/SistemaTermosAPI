const BaseService = require('./baseService');
const statusTermoRepository = require('../repositories/statusTermoRepository');
const {
    validarUnicidadeStatusTermo
} = require('../utils');

class StatusTermoService extends BaseService {
    constructor() {
        super(statusTermoRepository, 'Status');
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
        const errosValidacao = await validarUnicidadeStatusTermo(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new StatusTermoService();