const BaseService = require('./baseService');
const statusEquipamentoRepository = require('../repositories/statusEquipamentoRepository');
const {
    validarUnicidadeStatusEquipamento
} = require('../utils');

class StatusEquipamentoService extends BaseService {
    constructor() {
        super(statusEquipamentoRepository, 'Status');
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
        const errosValidacao = await validarUnicidadeStatusEquipamento(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new StatusEquipamentoService();