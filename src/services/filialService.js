const filialRepository = require('../repositories/filialRepository');
const {
    validarDados
} = require('../utils');
const {
    filialSchema
} = require('../validations');


class FilialService {
    async criar(dados) {
        validarDados(dados, filialSchema);
        return await filialRepository.criar(dados);
    }

    async listar(filtros = {}) {
        return await filialRepository.listar(filtros);
    }

    async buscarPorId(id) {
        return await filialRepository.buscarPorId(id);
    }

    async atualizar(id, dados) {
        validarDados(dados, filialSchema);
        return await filialRepository.atualizar(id, dados);
    }

    async remover(id) {
        return await filialRepository.remover(id);
    }
}

module.exports = new FilialService();