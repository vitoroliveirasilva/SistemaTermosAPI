const BaseService = require('./baseService');
const modeloRepository = require('../repositories/modeloRepository');
const {
    validarUnicidadeModelo
} = require('../utils');

class ModeloService extends BaseService {
    constructor() {
        super(modeloRepository, 'Modelo');
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
        const errosValidacao = await validarUnicidadeModelo(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new ModeloService();