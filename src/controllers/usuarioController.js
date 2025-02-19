const usuarioService = require('../services/usuarioService');

async function criarUsuario(req, res, next) {
  try {
    const usuario = await usuarioService.cadastrarUsuario(req.body);
    return res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}

async function listarUsuarios(req, res, next) {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    return res.json(usuarios);
  } catch (error) {
    next(error);
  }
}

async function obterUsuario(req, res, next) {
  try {
    const {
      id
    } = req.params;
    const usuario = await usuarioService.obterUsuario(id);
    return res.json(usuario);
  } catch (error) {
    next(error);
  }
}

async function atualizarUsuario(req, res, next) {
  try {
    const {
      id
    } = req.params;
    const usuario = await usuarioService.editarUsuario(id, req.body);
    return res.json(usuario);
  } catch (error) {
    next(error);
  }
}

async function deletarUsuario(req, res, next) {
  try {
    const {
      id
    } = req.params;
    const usuarioRemovido = await usuarioService.removerUsuario(id);
    return res.json({
      message: 'Usuário desativado com sucesso',
      usuario: usuarioRemovido
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  obterUsuario,
  atualizarUsuario,
  deletarUsuario
};