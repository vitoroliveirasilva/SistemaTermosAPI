const BaseService = require('./baseService');
const equipamentoRepository = require('../repositories/equipamentoRepository');
const {
    validarUnicidadeEquipamento
} = require('../utils');

class EquipamentoService extends BaseService {
    constructor() {
        super(equipamentoRepository, 'Equipamento');
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
        const errosValidacao = await validarUnicidadeEquipamento(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new EquipamentoService();