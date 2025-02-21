const filialRepository = require('../repositories/filialRepository');
const {
    validarId
} = require('../utils/validarId');
const {
    validarDados,
    validarUnicidadeFilial
} = require('../utils');


class FilialService {
    async criar(dados) {
        try {
            // Valida os dados e verifica se já existe uma filial com os mesmos dados (para evitar duplicação)
            await validarUnicidadeFilial(dados);

            // Chama o repository para salvar no banco de dados
            return await filialRepository.criar(dados);
        } catch (error) {
            console.error('Erro ao criar filial:', error);
            throw {
                status: 500,
                message: 'Erro ao criar filial. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async listar(filtros = {}) {
        try {
            return await filialRepository.listar(filtros);
        } catch (error) {
            console.error('Erro ao listar filiais:', error);
            throw {
                status: 500,
                message: 'Erro ao listar filiais. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async buscarPorId(id) {
        try {
            this.#validarIdOuErro(id);

            const filial = await filialRepository.buscarPorId(id);

            if (!filial) {
                throw {
                    status: 404,
                    message: `Filial com ID ${id} não encontrada.`
                };
            }

            return filial;
        } catch (error) {
            if (error.status && error.message) {
                throw error;
            }

            console.error(`Erro inesperado ao buscar filial com ID ${id}:`, error.message || error);
            throw {
                status: 500,
                message: 'Erro ao buscar filial. Tente novamente mais tarde.'
            };
        }
    }

    async atualizar(id, dados) {
        try {
            this.#validarIdOuErro(id);

            // Verifica se a filial existe antes de atualizar
            const filialAtual = await filialRepository.buscarPorId(id);
            if (!filialAtual) {
                throw {
                    status: 404,
                    message: `Filial com ID ${id} não encontrada.`
                };
            }

            // Valida os dados e verifica se respeitam a unicidade
            await validarUnicidadeFilial(dados, id);

            // Verifica se há conflitos de unicidade antes de continuar
            const errosValidacao = await validarUnicidadeFilial(dados, id);
            if (errosValidacao.length > 0) {
                return {
                    status: 400,
                    message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                    errors: errosValidacao
                };
            }

            // Verifica se houve mudanças nos dados antes de salvar
            if (!this.#houveAlteracao(filialAtual, dados)) {
                return {
                    status: 200,
                    message: 'Nenhuma alteração foi feita nos dados da filial.'
                };
            }

            return await filialRepository.atualizar(id, dados);
        } catch (error) {
            console.error(`Erro ao atualizar filial com ID ${id}:`, error);
            throw error;
        }
    }

    async remover(id) {
        try {
            this.#validarIdOuErro(id);

            // Verifica se a filial existe antes de remover
            const filialAtual = await filialRepository.buscarPorId(id);
            if (!filialAtual) {
                throw {
                    status: 404,
                    message: `Filial com ID ${id} não encontrada.`
                };
            }

            await filialRepository.remover(id);

            return {
                status: 200,
                message: `Filial com ID ${id} removida com sucesso.`
            };
        } catch (error) {
            console.error(`Erro ao remover filial com ID ${id}:`, error);
            throw error;
        }
    }

    // Método privado para validar ID
    #validarIdOuErro(id) {
        const resultIdValidacao = validarId(id);
        if (!resultIdValidacao.valido) {
            throw {
                status: 400,
                message: resultIdValidacao.mensagem
            };
        }
    }

    // Método privado para verificar se houve alteração nos dados
    #houveAlteracao(filialAtual, novosDados) {
        return Object.keys(novosDados).some(campo => novosDados[campo] !== filialAtual[campo]);
    }
}

module.exports = new FilialService();