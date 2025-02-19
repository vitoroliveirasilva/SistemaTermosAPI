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
            console.error("Erro ao criar filial:", error);
            throw new Error("Erro ao criar filial.");
        }
    }

    async listar(filtros = {}) {
        try {
            return await Filial.findAll({
                where: this.#construirFiltros(filtros)
            });
        } catch (error) {
            console.error("Erro ao listar filiais:", error);
            throw new Error("Erro ao listar filiais.");
        }
    }

    async buscarPorId(id) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        try {
            return await Filial.findByPk(id, {
                rejectOnEmpty: false
            });
        } catch (error) {
            console.error(`Erro ao buscar filial com ID ${id}:`, error);
            throw new Error("Erro ao buscar filial.");
        }
    }

    async buscarPorFiltros(filtros = {}) {
        try {
            return await Filial.findAll({
                where: this.#construirFiltros(filtros)
            });
        } catch (error) {
            console.error("Erro ao buscar filiais por filtros:", error);
            throw new Error("Erro ao buscar filiais.");
        }
    }

    async atualizar(id, dados) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const filial = await this.buscarPorId(id);
        if (!filial) return null;

        try {
            return await filial.update(dados);
        } catch (error) {
            console.error(`Erro ao atualizar filial com ID ${id}:`, error);
            throw new Error("Erro ao atualizar filial.");
        }
    }

    async remover(id) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }
        
        const filial = await this.buscarPorId(id);
        if (!filial) return null;

        try {
            await filial.destroy();
            return filial;
        } catch (error) {
            console.error(`Erro ao remover filial com ID ${id}:`, error);
            throw new Error("Erro ao remover filial.");
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