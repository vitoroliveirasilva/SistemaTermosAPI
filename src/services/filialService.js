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
            throw {
                status: 404,
                message: `Filial com ID ${id} não encontrada.`
            };
        }
        return filial;
    }

    async atualizar(id, dados) {
        // Verifica se existe filial com o ID informado
        const filialAtual = await this.buscarPorId(id);

        // Valida os dados do body
        validarDados(dados, filialSchema);

        // Verifica se houve alguma alteração nos dados
        const camposAlterados = Object.keys(dados).some(campo => dados[campo] !== filialAtual[campo]);

        if (!camposAlterados) {
            return {
                status: 200,
                message: 'Nenhuma alteração foi feita nos dados da filial.'
            };
        }

        return await filialRepository.atualizar(id, dados);
    }

    async remover(id) {
        return await filialRepository.remover(id);
    }
}

module.exports = new FilialService();