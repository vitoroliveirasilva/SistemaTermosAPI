const { Op } = require('sequelize');

class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async criar(dados) {
        try {
            return await this.model.create(dados);
        } catch (error) {
            console.error(`Erro ao criar ${this.model.displayName.toLowerCase()}:`, error);
            throw {
                status: 500,
                message: `Erro ao criar ${this.model.displayName.toLowerCase()}. Tente novamente mais tarde.`,
                error: error.message
            };
        }
    }

    async listar(filtros = {}) {
        try {
            return await this.model.findAll({
                where: this.#construirFiltros(filtros)
            });
        } catch (error) {
            console.error('Erro ao obter todos os registros:', error);
            throw {
                status: 500,
                message: 'Erro ao obter todos os registros. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async buscarPorId(id) {
        try {
            const registro = await this.model.findByPk(id);
            return registro || null;
        } catch (error) {
            console.error(`Erro ao buscar ${this.model.displayName.toLowerCase()} com ID ${id}:`, error);
            throw {
                status: 500,
                message: `Erro ao buscar ${this.model.displayName.toLowerCase()}. Tente novamente mais tarde.`,
                error: error.message
            };
        }
    }

    async buscarPorFiltros(filtros = {}) {
        try {
            return await this.model.findAll({
                where: this.#construirFiltros(filtros)
            });
        } catch (error) {
            console.error('Erro ao obter os registros filtrados:', error);
            throw {
                status: 500,
                message: 'Erro ao obter os registros filtrados. Tente novamente mais tarde.',
                error: error.message
            };
        }
    }

    async atualizar(id, dados) {
        try {
            const registro = await this.model.findByPk(id);
            if (!registro) {
                throw {
                    status: 404,
                    message: `ID ${id} não encontrado.`
                };
            }

            await this.model.update(dados, {
                where: {
                    id
                }
            });
            return await this.model.findByPk(id);
        } catch (error) {
            console.error(`Erro ao atualizar ${this.model.displayName.toLowerCase()} com ID ${id}:`, error);
            throw {
                status: 500,
                message: `Erro ao atualizar ${this.model.displayName.toLowerCase()}. Tente novamente mais tarde.`,
                error: error.message
            };
        }
    }

    async remover(id) {
        try {
            const registro = await this.model.findByPk(id);
            if (!registro) {
                throw {
                    status: 404,
                    message: `ID ${id} não encontrado.`
                };
            }

            return await this.model.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error(`Erro ao remover ${this.model.displayName.toLowerCase()} com ID ${id}:`, error);
            throw {
                status: 500,
                message: `Erro ao remover ${this.model.displayName.toLowerCase()}. Tente novamente mais tarde.`,
                error: error.message
            };
        }
    }

    #construirFiltros({
        nome,
        endereco,
        descricao
    }) {
        const filtros = {};
        if (nome) filtros.nome = {
            [Op.like]: `%${nome.trim()}%`
        };
        if (endereco) filtros.endereco = {
            [Op.like]: `%${endereco.trim()}%`
        };
        if (descricao) filtros.descricao = {
            [Op.like]: `%${descricao.trim()}%`
        };
        return filtros;
    }
}

module.exports = BaseRepository;