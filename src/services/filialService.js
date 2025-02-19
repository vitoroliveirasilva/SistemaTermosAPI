const filialRepository = require('../repositories/filialRepository');
const {
    validarDados,
    unicidadeFilial
} = require('../utils');
const {
    filialSchema
} = require('../validations');


class FilialService {
    async criar(dados) {
        validarDados(dados, filialSchema);
        await unicidadeFilial(dados);
        return await filialRepository.criar(dados);
    }

    async listar(filtros = {}) {
        return await filialRepository.listar(filtros);
    }

    async buscarPorId(id) {
        const filial = await filialRepository.buscarPorId(id);
        if (!filial) {
            throw { status: 404, message: `Filial com ID ${id} não encontrada.` };
        }
        return filial;
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