const filialRepository = require('../repositories/filialRepository');
const {
    validarDados
} = require('../utils/validator');
const {
    filialSchema
} = require('../validations/filialSchema');


class FilialService {
    async criar(dados) {
        validarDados(dados, filialSchema);
        return await filialRepository.create(dados);
    }

    async listar() {
        return await filialRepository.findAll();
    }

    async buscarPorId(id) {
        const filial = await filialRepository.findById(id);
        if (!filial) throw new Error("Filial não encontrada.");
        return filial;
    }

    async atualizar(id, dados) {
        validarDados(dados, filialSchema);
        const filialAtualizada = await filialRepository.update(id, dados);
        if (!filialAtualizada) throw new Error("Filial não encontrada.");
        return filialAtualizada;
    }

    async remover(id) {
        const filialRemovida = await filialRepository.delete(id);
        if (!filialRemovida) throw new Error("Filial não encontrada.");
        return filialRemovida;
    }
}

module.exports = new FilialService();