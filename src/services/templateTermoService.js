const BaseService = require('./baseService');
const templateTermoRepository = require('../repositories/templateTermoRepository');
const {
    validarUnicidadeTemplateTermo
} = require('../utils');

class TemplateTermoService extends BaseService {
    constructor() {
        super(templateTermoRepository, 'Template');
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
        const errosValidacao = await validarUnicidadeTemplateTermo(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new TemplateTermoService();