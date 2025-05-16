const BaseRepository = require('../baseRepository');
const RefreshToken = require('../../models/auth/tb_refreshToken');

class RefreshTokenRepository extends BaseRepository {
  constructor() {
    super(RefreshToken);
  }

  async buscarPorToken(token) {
    if (!token || typeof token !== 'string') {
      throw new Error('Token inválido para busca.');
    }
    return await this.model.findOne({ where: { token } });
  }

  async removerPorToken(token) {
    if (!token || typeof token !== 'string') {
      throw new Error('Token inválido para remoção.');
    }
    return await this.model.destroy({ where: { token } });
  }

  async removerTodosDoUsuario(usuario_id) {
    if (!usuario_id || isNaN(usuario_id)) {
      throw new Error('ID de usuário inválido.');
    }
    return await this.model.destroy({ where: { usuario_id } });
  }
}

module.exports = new RefreshTokenRepository();
