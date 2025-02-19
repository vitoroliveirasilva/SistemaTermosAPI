const usuarioService = require('../services/usuarioService');

class UsuarioController {
  async criar(req, res, next) {
    try {
      const usuario = await usuarioService.criar(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async listar(req, res, next) {
    try {
      const usuarios = await usuarioService.listar();
      return res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorFiltros(req, res, next) {
    try {
      const usuarios = await usuarioService.listar(req.query);
      return res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const usuario = await usuarioService.buscarPorId(req.params.id);
      if (!usuario) {
        return res.status(404).json({
          erro: 'Usuário não encontrado'
        });
      }
      return res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const usuario = await usuarioService.atualizar(req.params.id, req.body);
      return res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async remover(req, res, next) {
    try {
      await usuarioService.remover(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async vincularFilial(req, res, next) {
    try {
      const {
        id,
        filialId
      } = req.params;
      const usuario = await usuarioService.vincularFilial(id, filialId);
      return res.status(200).json({
        mensagem: "Usuário vinculado à filial com sucesso",
        usuario
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsuarioController();