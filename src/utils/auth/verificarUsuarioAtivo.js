/*
 * Verifica se o usuário está ativo e válido.
 * @param {Object|null} usuario - Objeto do usuário.
 * @throws Erro 403 se inativo ou nulo.
*/
function verificarUsuarioAtivo(usuario) {
  if (!usuario || usuario.status !== 'ativo') {
    throw {
      status: 403,
      message: 'Usuário inválido ou inativo.'
    };
  }
}

module.exports = verificarUsuarioAtivo;
