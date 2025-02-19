const {
    Filial
} = require('../models');
const {
    Op
} = require('sequelize');


class FilialRepository {
    async criar(dados) {
        return await Filial.create(dados);
    }

    async listar(filtros = {}) {
        return await Filial.findAll({
            where: this.#construirFiltros(filtros)
        });
    }

    async buscarPorId(id) {
        return await Filial.findByPk(id);
    }

    async buscarPorFiltros({
        nome,
        endereco
    }) {
        const filtros = this.#construirFiltros({
            nome,
            endereco
        });

        return await Filial.findAll({
            where: filtros
        });
    }

    async atualizar(id, dados) {
        const filial = await this.buscarPorId(id);
        if (!filial) return null;
        return await filial.update(dados);
    }

    async remover(id) {
        const filial = await this.buscarPorId(id);
        if (!filial) return null;
        await filial.destroy();
        return filial;
    }

    /*
     * Método privado para construir filtros dinâmicos
     * @param {Object} filtros - Objeto contendo os filtros (nome, endereco)
     * @returns {Object} - Objeto de filtros formatado para Sequelize
    */
    #construirFiltros({
        nome,
        endereco
    }) {
        const filtros = {};

        if (nome) {
            filtros.nome = {
                [Op.like]: `%${nome}%`
            };
        }

        if (endereco) {
            filtros.endereco = {
                [Op.like]: `%${endereco}%`
            };
        }

        return filtros;
    }
}

module.exports = new FilialRepository();