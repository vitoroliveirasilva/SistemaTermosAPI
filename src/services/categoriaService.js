const BaseService = require('./baseService');
const categoriaRepository = require('../repositories/categoriaRepository');
const {
    validarUnicidadeCategoria
} = require('../utils');

class CategoriaService extends BaseService {
    constructor() {
        super(categoriaRepository, 'Categoria');
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
        const errosValidacao = await validarUnicidadeCategoria(dados);
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                errors: errosValidacao
            };
        }
    }
}

module.exports = new CategoriaService();