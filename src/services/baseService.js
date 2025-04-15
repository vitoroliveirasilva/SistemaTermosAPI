const {
    validarId
} = require('../utils/validacaoId');

class BaseService {
    constructor(repository, nomeEntidade = 'Registro') {
        if (!repository) throw new Error('Repository é obrigatório.');
        this.repository = repository;
        this.nomeEntidade = nomeEntidade;
    }

    async criar(dados) {
        try {
            return await this.repository.criar(dados);
        } catch (error) {
            console.error(`Erro ao criar ${this.nomeEntidade.toLowerCase()}:`, error);
            throw {
                status: 500,
                message: `Erro ao criar ${this.nomeEntidade.toLowerCase()}. Tente novamente mais tarde.`,
                error: error.message
            };
        }
    }

    async listar(filtros = {}) {
        try {
            return await this.repository.listar(filtros);
        } catch (error) {
            console.error(`Erro ao listar ${this.nomeEntidade.toLowerCase()}:`, error);
            throw {
                status: 500,
                message: `Erro ao listar ${this.nomeEntidade.toLowerCase()}. Tente novamente mais tarde.`,
                error: error.message
            };
        }
    }

    async buscarPorId(id) {
        try {
            this.#validarIdOuErro(id);

            const registro = await this.repository.buscarPorId(id);
            if (!registro) {
                throw {
                    status: 404,
                    message: `ID ${id} não encontrado.`
                };
            }

            return registro;
        } catch (error) {
            if (error.status && error.message) throw error;

            console.error(`Erro inesperado ao buscar ${this.nomeEntidade.toLowerCase()} com ID ${id}:`, error.message || error);
            throw {
                status: 500,
                message: `Erro ao buscar ${this.nomeEntidade.toLowerCase()}. Tente novamente mais tarde.`
            };
        }
    }

    async atualizar(id, dados) {
        try {
            this.#validarIdOuErro(id);

            const registroAtual = await this.repository.buscarPorId(id);
            if (!registroAtual) {
                throw {
                    status: 404,
                    message: `ID ${id} não encontrado.`
                };
            }

            if (!this.#houveAlteracao(registroAtual, dados)) {
                return {
                    status: 200,
                    message: `Nenhuma alteração foi feita nos dados da ${this.nomeEntidade.toLowerCase()}.`
                };
            }

            return await this.repository.atualizar(id, dados);
        } catch (error) {
            console.error(`Erro ao atualizar ${this.nomeEntidade.toLowerCase()} com ID ${id}:`, error);
            throw error;
        }
    }

    async remover(id) {
        try {
            this.#validarIdOuErro(id);

            const registroAtual = await this.repository.buscarPorId(id);
            if (!registroAtual) {
                throw {
                    status: 404,
                    message: `ID ${id} não encontrado.`
                };
            }

            await this.repository.remover(id);
            return {
                status: 204,
                message: `ID ${id} removido com sucesso.`
            };
        } catch (error) {
            console.error(`Erro ao remover ${this.nomeEntidade.toLowerCase()} com ID ${id}:`, error);
            throw error;
        }
    }

    #validarIdOuErro(id) {
        const resultIdValidacao = validarId(id);
        if (!resultIdValidacao.valido) {
            throw {
                status: 400,
                message: resultIdValidacao.mensagem
            };
        }
    }

    #houveAlteracao(registroAtual, novosDados) {
        return Object.keys(novosDados).some(campo => novosDados[campo] !== registroAtual[campo]);
    }
}

module.exports = BaseService;