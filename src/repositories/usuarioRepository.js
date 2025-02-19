const {
  Usuario
} = require('../models');

async function criarUsuario(dados) {
  return await Usuario.create(dados);
}

async function buscarUsuarioPorId(id) {
  return await Usuario.findByPk(id);
}

async function buscarUsuarioPorEmail(email) {
  return await Usuario.findOne({
    where: {
      email
    }
  });
}

async function listarUsuarios() {
  return await Usuario.findAll();
}

async function atualizarUsuario(id, dados) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  return await usuario.update(dados);
}

async function deletarUsuario(id) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;

  // Alterando status para inativo
  await usuario.update({
    status: 'inativo'
  });
  return usuario;
}

module.exports = {
  criarUsuario,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario
};