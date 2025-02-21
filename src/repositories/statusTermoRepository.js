const {
    TermStatus
} = require('../models');
const {
    Op
} = require('sequelize');


class StatusTermoRepository {
    async criar(dados) {
        try {
            return await TermStatus.create(dados);
        } catch (error) {
            console.error('Erro ao criar status de termo:', error);
            throw {
                status: 500,
                message: 'Erro ao criar status de termo. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async listar(filtros = {}) {
        try {
            return await TermStatus.findAll({
                where: this.#construirFiltros(filtros)
            });
        } catch (error) {
            console.error('Erro ao listar status de termos:', error);
            throw {
                status: 500,
                message: 'Erro ao listar status de termos. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async buscarPorId(id) {
        try {
            const statusTermo = await TermStatus.findByPk(id);
            return statusTermo || null;
        } catch (error) {
            console.error(`Erro ao buscar status de termo com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao buscar status de termo. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async buscarPorFiltros(filtros = {}) {
        try {
            return await TermStatus.findAll({
                where: this.#construirFiltros(filtros)
            });
        } catch (error) {
            console.error('Erro ao buscar status de termos por filtros:', error);
            throw {
                status: 500,
                message: 'Erro ao buscar status de termos. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async atualizar(id, dados) {
        try {
            const statusTermo = await this.buscarPorId(id);
            if (!statusTermo) {
                throw {
                    status: 404,
                    message: `Status de termo com ID ${id} não encontrado.`
                };
            }

            await statusTermo.update(dados);
            return statusTermo;
        } catch (error) {
            console.error(`Erro ao atualizar status de termo com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao atualizar status de termo. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async remover(id) {
        try {
            const statusTermo = await this.buscarPorId(id);
            if (!statusTermo) {
                throw {
                    status: 404,
                    message: `Status de termo com ID ${id} não encontrado.`
                };
            }

            await TermStatus.destroy();
            return {
                status: 200,
                message: `Status de termo com ID ${id} removido com sucesso.`
            };
        } catch (error) {
            console.error(`Erro ao remover status de termo com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao remover status de termo. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    #construirFiltros({
        nome
    }) {
        const filtros = {};
        if (nome) filtros.nome = {
            [Op.like]: `%${nome.trim()}%`
        }
        return filtros;
    }
}

module.exports = new StatusTermoRepository();