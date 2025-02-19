const {
  Usuario
} = require('../models');
const {
  Op
} = require('sequelize');

class UsuarioRepository {
  async criar(dados) {
    try {
      const usuario = await Usuario.create(dados);
      return usuario ? this.#removerSenha(usuario) : null;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error("Erro ao criar usuário.");
    }
  }

  async listar(filtros = {}) {
    try {
      const usuarios = await Usuario.findAll({
        where: this.#construirFiltros(filtros)
      });

      return usuarios.map(usuario => this.#removerSenha(usuario));
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw new Error("Erro ao listar usuários.");
    }
  }

  async buscarPorId(id) {
    if (!id || isNaN(id) || id <= 0) {
      throw new Error("ID inválido.");
    }

    try {
      const usuario = await Usuario.findByPk(id);
      return usuario ? this.#removerSenha(usuario) : null;
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
      throw new Error("Erro ao buscar usuário.");
    }
  }

  async buscarPorFiltros(filtros = {}) {
    try {
      const usuarios = await Usuario.findAll({
        where: this.#construirFiltros(filtros)
      });

      return usuarios.map(usuario => this.#removerSenha(usuario));
    } catch (error) {
      console.error("Erro ao buscar usuários por filtros:", error);
      throw new Error("Erro ao buscar usuários.");
    }
  }

  /*
   * Método usado para buscar um usuário e incluir a senha
   * Utilizado apenas quando realmente necessário, como autenticação
  */
  async buscarComSenha(email) {
    try {
      return await Usuario.scope('withPassword').findOne({
        where: {
          email
        }
      });
    } catch (error) {
      console.error("Erro ao buscar usuário com senha:", error);
      throw new Error("Erro ao buscar usuário com senha.");
    }
  }

  async atualizar(id, dados) {
    if (!id || isNaN(id) || id <= 0) {
      throw new Error("ID inválido.");
    }

    try {
      const [atualizados] = await Usuario.update(dados, {
        where: {
          id
        }
      });
      if (!atualizados) return null;
      return await this.buscarPorId(id);
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
      throw new Error("Erro ao atualizar usuário.");
    }
  }

  async remover(id) {
    if (!id || isNaN(id) || id <= 0) {
      throw new Error("ID inválido.");
    }

    try {
      const [atualizados] = await Usuario.update({
        status: 'inativo'
      }, {
        where: {
          id
        }
      });
      if (!atualizados) return null;
      return await this.buscarPorId(id);
    } catch (error) {
      console.error(`Erro ao remover usuário com ID ${id}:`, error);
      throw new Error("Erro ao remover usuário.");
    }
  }

  async vincularFilial(idUsuario, idFilial) {
    try {
      const [atualizados] = await Usuario.update({
        filial_id: idFilial
      }, {
        where: {
          id: idUsuario
        }
      });
      if (!atualizados) return null;
      return await this.buscarPorId(idUsuario);
    } catch (error) {
      console.error(`Erro ao vincular usuário ${idUsuario} à filial ${idFilial}:`, error);
      throw new Error("Erro ao vincular usuário à filial.");
    }
  }

  /*
   * Método privado para construir filtros dinâmicos para busca
   * @param {Object} filtros - Objeto contendo os filtros (nome, email, status)
   * @returns {Object} - Objeto de filtros formatado para Sequelize
  */
  #construirFiltros({
    nome,
    email,
    status
  }) {
    const filtros = {};

    if (nome) filtros.nome = {
      [Op.like]: `%${nome.trim()}%`
    };
    if (email) filtros.email = {
      [Op.like]: `%${email.trim()}%`
    };
    if (status) filtros.status = status;

    return filtros;
  }

  /*
   * Método privado para remover a senha de um usuário antes de retornar os dados
   * @param {Object} usuario - Objeto do usuário retornado pelo banco
   * @returns {Object} - Objeto sem a senha
  */
  #removerSenha(usuario) {
    if (!usuario) return null;
    const {
      senha,
      ...usuarioSemSenha
    } = usuario.toJSON();
    return usuarioSemSenha;
  }
}

module.exports = new UsuarioRepository();