const bcrypt = require('bcrypt');
const BaseService = require('../baseService');
const refreshTokenRepository = require('../../repositories/auth/refreshTokenRepository');
const usuarioRepository = require('../../repositories/organizacional/usuarioRepository');
const { gerarAccessToken, gerarRefreshToken } = require('../../utils/auth/tokenUtil');
const verificarUsuarioAtivo = require('../../utils/auth/verificarUsuarioAtivo');

class AuthService extends BaseService {
  constructor() {
    super(refreshTokenRepository, 'RefreshToken');
  }

  async autenticar(email, senha) {
    try {
      if (!email || !senha) {
        throw { status: 400, message: 'E-mail e senha obrigatórios.' };
      }

      const usuario = await usuarioRepository.buscarComSenha(email);
      verificarUsuarioAtivo(usuario);

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        throw { status: 401, message: 'Credenciais inválidas.' };
      }

      return await this.#gerarTokens(usuario);
    } catch (error) {
      console.error('[AuthService] Erro ao autenticar:', error);
      throw error.status ? error : { status: 500, message: 'Erro interno ao autenticar.', error };
    }
  }

  async renovarToken(refreshToken) {
    try {
      if (!refreshToken) {
        throw { status: 400, message: 'Refresh token não fornecido.' };
      }

      const tokenEncontrado = await this.repository.buscarPorToken(refreshToken);
      if (!tokenEncontrado || tokenEncontrado.expiracao < new Date()) {
        throw { status: 401, message: 'Refresh token inválido ou expirado.' };
      }

      const usuario = await usuarioRepository.buscarPorId(tokenEncontrado.usuario_id);
      verificarUsuarioAtivo(usuario);

      await this.repository.remover(tokenEncontrado.id);
      return await this.#gerarTokens(usuario);
    } catch (error) {
      console.error('[AuthService] Erro ao renovar token:', error);
      throw error.status ? error : { status: 500, message: 'Erro interno ao renovar token.', error };
    }
  }

  async logout(refreshToken) {
    try {
      if (!refreshToken) {
        throw { status: 400, message: 'Refresh token não fornecido.' };
      }

      const removidos = await this.repository.removerPorToken(refreshToken);

      if (!removidos) {
        throw { status: 400, message: 'Refresh token não encontrado ou já revogado.' };
      }

      return;
    } catch (error) {
      console.error('[AuthService] Erro ao fazer logout:', error);
      throw error.status
        ? error
        : { status: 500, message: 'Erro interno ao fazer logout.', error: error.message };
    }
  }

  async revogarTodosDoUsuario(usuario_id) {
    try {
      await this.repository.removerTodosDoUsuario(usuario_id);
    } catch (error) {
      console.error(`[AuthService] Erro ao revogar sessões do usuário ${usuario_id}:`, error);
      throw { status: 500, message: 'Erro ao revogar sessões do usuário.' };
    }
  }

  async #gerarTokens(usuario) {
    const accessToken = gerarAccessToken({
      id: usuario.id,
      nome: usuario.nome,
      papel: usuario.permissao
    });

    const refreshToken = gerarRefreshToken({ id: usuario.id });

    await this.repository.criar({
      token: refreshToken,
      usuario_id: usuario.id,
      expiracao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
    });

    return {
      token: accessToken,
      refreshToken,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.permissao
      }
    };
  }
}

module.exports = new AuthService();
