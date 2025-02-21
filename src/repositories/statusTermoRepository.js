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
            return await TermStatus.findAll({
                where: this.#construirFiltros(filtros)
            });
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
            const statusTermo = await TermStatus.findByPk(id);
            return statusTermo || null;
        } catch (error) {
            console.error(`Erro ao buscar status com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao buscar status. Tente novamente mais tarde.',
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
            console.error('Erro ao buscar status por filtros:', error);
            throw {
                status: 500,
                message: 'Erro ao buscar status. Tente novamente mais tarde.',
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
                    message: `Status com ID ${id} não encontrado.`
                };
            }

            return await TermStatus.update(dados);
        } catch (error) {
            console.error(`Erro ao atualizar status com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao atualizar status. Tente novamente mais tarde.',
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
                    message: `Status com ID ${id} não encontrado.`
                };
            }

            return await TermStatus.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error(`Erro ao remover status com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao remover status. Tente novamente mais tarde.',
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