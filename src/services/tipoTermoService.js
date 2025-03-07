const BaseService = require('./baseService');
const tipoTermoRepository = require('../repositories/tipoTermoRepository');
const {
    validarUnicidadeTipoTermo
} = require('../utils');

class TipoTermoService extends BaseService {
    constructor() {
        super(tipoTermoRepository, 'Tipo');
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
        const errosValidacao = await validarUnicidadeTipoTermo(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new TipoTermoService();