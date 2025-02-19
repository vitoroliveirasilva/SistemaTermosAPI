const {
  Usuario
} = require('../models');
const {
  Op
} = require('sequelize');


class UsuarioRepository {
  async criar(dados) {
    return await Usuario.create(dados);
  }

  async listar(filtros = {}) {
    return await Usuario.findAll({
      where: this.#construirFiltros(filtros)
    });
  }

  async buscarPorId(id) {
    return await Usuario.findByPk(id);
  }

  async buscarPorFiltros({
    nome,
    status,
    email,
    incluirSenha = false
  }) {
    const filtros = this.#construirFiltros({
      nome,
      status,
      email
    });

    return await Usuario.scope(incluirSenha ? 'withPassword' : null).findAll({
      where: filtros
    });
  }

  async atualizar(id, dados) {
    const usuario = await this.buscarPorId(id);
    if (!usuario) return null;
    return await usuario.update(dados);
  }

  async remover(id) {
    const usuario = await this.buscarPorId(id);
    if (!usuario) return null;

    await usuario.update({
      status: 'inativo'
    });
    return usuario;
  }

  /*
   * Método privado para construir filtros dinâmicos
   * @param {Object} filtros - Objeto contendo os filtros (nome, status, email)
   * @returns {Object} - Objeto de filtros formatado para Sequelize
  */
  #construirFiltros({
    nome,
    status,
    email
  }) {
    const filtros = {};

    if (nome) {
      filtros.nome = {
        [Op.like]: `%${nome}%`
      };
    }

    if (email) {
      filtros.email = {
        [Op.like]: `%${email}%`
      };
    }

    if (status) {
      filtros.status = status;
    }

    return filtros;
  }

}

module.exports = new UsuarioRepository();