const {
    Filial
} = require('../models');
const {
    Op
} = require('sequelize');


class FilialRepository {
    async criar(dados) {
        try {
            return await Filial.create(dados);
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
            return await Filial.findAll({
                where: this.#construirFiltros(filtros)
            });
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
            const filial = await Filial.findByPk(id);
            return filial || null;
        } catch (error) {
            console.error(`Erro ao buscar filial com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao buscar filial. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async buscarPorFiltros(filtros = {}) {
        try {
            return await Filial.findAll({
                where: this.#construirFiltros(filtros)
            });
        } catch (error) {
            console.error('Erro ao buscar filiais por filtros:', error);
            throw {
                status: 500,
                message: 'Erro ao buscar filiais. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async atualizar(id, dados) {
        try {
            const filial = await this.buscarPorId(id);
            if (!filial) {
                throw {
                    status: 404,
                    message: `Filial com ID ${id} não encontrada.`
                };
            }

            return await filial.update(dados);
        } catch (error) {
            console.error(`Erro ao atualizar filial com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao atualizar filial. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async remover(id) {
        try {
            const filial = await this.buscarPorId(id);
            if (!filial) {
                throw {
                    status: 404,
                    message: `Filial com ID ${id} não encontrada.`
                };
            }

            return await filial.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error(`Erro ao remover filial com ID ${id}:`, error);
            throw {
                status: 500,
                message: 'Erro ao remover filial. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    #construirFiltros({
        nome,
        endereco
    }) {
        const filtros = {};
        if (nome) filtros.nome = {
            [Op.like]: `%${nome.trim()}%`
        };
        if (endereco) filtros.endereco = {
            [Op.like]: `%${endereco.trim()}%`
        };
        return filtros;
    }
}

module.exports = new FilialRepository();