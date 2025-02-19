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

  async criarEmMassa(req, res, next) {
    try {
      const {
        usuarios
      } = req.body;

      if (!Array.isArray(usuarios) || usuarios.length === 0) {
        return res.status(400).json({
          erro: "A lista de usuários é obrigatória e deve conter pelo menos um usuário."
        });
      }

      const resultado = await usuarioService.criarEmMassa(usuarios);

      return res.status(201).json({
        mensagem: "Processamento concluído para a criação de usuários",
        resultado
      });
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

  async vincularMultiplosUsuarios(req, res, next) {
    try {
      const {
        id: idFilial
      } = req.params;
      const {
        usuarios
      } = req.body;

      // Validação de ID da filial
      if (!idFilial || isNaN(idFilial) || idFilial <= 0) {
        return res.status(400).json({
          erro: "ID da filial inválido."
        });
      }

      // Validação da lista de usuários
      if (!Array.isArray(usuarios) || usuarios.length === 0) {
        return res.status(400).json({
          erro: "A lista de usuários é obrigatória e deve conter pelo menos um ID válido."
        });
      }

      // Chama o serviço para vincular usuários
      const resultado = await usuarioService.vincularMultiplosUsuarios(idFilial, usuarios);

      // Se nenhum usuário foi vinculado, retorna erro 400
      if (resultado.totalVinculados === 0) {
        return res.status(400).json({
          erro: "Nenhum usuário válido encontrado para vinculação."
        });
      }

      return res.status(200).json({
        mensagem: `Usuários vinculados com sucesso à filial ${idFilial}`,
        resultado
      });

    } catch (error) {
      console.error(`[Erro] ${error.message} - Rota: ${req.originalUrl}`);

      if (error.message === "Filial não encontrada.") {
        return res.status(404).json({
          erro: error.message
        });
      }

      if (error.message === "Nenhum usuário válido encontrado para vinculação.") {
        return res.status(400).json({
          erro: error.message
        });
      }

      next(error);
    }
  }

}

module.exports = new UsuarioController();