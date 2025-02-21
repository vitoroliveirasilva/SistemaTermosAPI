const statusTermoRepository = require('../repositories/statusTermoRepository');
const {
    validarId
} = require('../utils/validarId');
const {
    validarUnicidadeStatusTermo
} = require('../utils');


class StatusTermoService {
    async criar(dados) {
        try {
            // Valida os dados e verifica se já existe um status do termo com os mesmos dados (para evitar duplicação)
            await validarUnicidadeStatusTermo(dados);

            // Chama o repository para salvar no banco de dados
            return await statusTermoRepository.criar(dados);
        } catch (error) {
            console.error('Erro ao criar status:', error);
            throw {
                status: 500,
                message: 'Erro ao criar status. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async listar(filtros = {}) {
        try {
            return await statusTermoRepository.listar(filtros);
        } catch (error) {
            console.error('Erro ao listar status:', error);
            throw {
                status: 500,
                message: 'Erro ao listar status. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async buscarPorId(id) {
        try {
            this.#validarIdOuErro(id);

            const statusTermo = await statusTermoRepository.buscarPorId(id);

            if (!statusTermo) {
                throw {
                    status: 404,
                    message: `Status com ID ${id} não encontrado.`
                };
            }

            return statusTermo;
        } catch (error) {
            if (error.status && error.message) {
                throw error;
            }

            console.error(`Erro inesperado ao buscar status com ID ${id}:`, error.message || error);
            throw {
                status: 500,
                message: 'Erro ao buscar status. Tente novamente mais tarde.'
            };
        }
    }

    async atualizar(id, dados) {
        try {
            this.#validarIdOuErro(id);

            // Verifica se o status existe antes de atualizar
            const statusTermoAtual = await statusTermoRepository.buscarPorId(id);
            if (!statusTermoAtual) {
                throw {
                    status: 404,
                    message: `Status com ID ${id} não encontrado.`
                };
            }

            // Valida os dados e verifica se respeitam a unicidade
            await validarUnicidadeStatusTermo(dados, id);

            // Verifica se há conflitos de unicidade antes de continuar
            const errosValidacao = await validarUnicidadeStatusTermo(dados, id);
            if (errosValidacao.length > 0) {
                return {
                    status: 400,
                    message: errosValidacao.length > 1 ? 'Campos duplicados.' : 'Campo duplicado.',
                    errors: errosValidacao
                };
            }

            // Verifica se houve mudanças nos dados antes de salvar
            if (!this.#houveAlteracao(statusTermoAtual, dados)) {
                return {
                    status: 200,
                    message: 'Nenhuma alteração foi feita nos dados do status.'
                };
            }

            return await statusTermoRepository.atualizar(id, dados);
        } catch (error) {
            console.error(`Erro ao atualizar status com ID ${id}:`, error);
            throw error;
        }
    }

    async remover(id) {
        try {
            this.#validarIdOuErro(id);

            // Verifica se o status existe antes de remover
            const statusTermoAtual = await statusTermoRepository.buscarPorId(id);
            if (!statusTermoAtual) {
                throw {
                    status: 404,
                    message: `Status com ID ${id} não encontrado.`
                };
            }

            await statusTermoRepository.remover(id);

            return {
                status: 200,
                message: `Status com ID ${id} removido com sucesso.`
            };
        } catch (error) {
            console.error(`Erro ao remover status com ID ${id}:`, error);
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
    #houveAlteracao(statusTermoAtual, novosDados) {
        return Object.keys(novosDados).some(campo => novosDados[campo] !== statusTermoAtual[campo]);
    }
}

module.exports = new StatusTermoService();