const jwt = require('jsonwebtoken');

/*
 * Gera o token de acesso (JWT) com expiração curta.
 * @param {Object} payload - Dados do usuário.
 * @returns {string} token JWT
*/
function gerarAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    algorithm: 'HS256'
  });
}

/*
 * Gera o refresh token com expiração longa.
 * @param {Object} payload - Dados mínimos (ex: id).
 * @returns {string} token JWT de refresh
*/
function gerarRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
    algorithm: 'HS256'
  });
}

module.exports = {
  gerarAccessToken,
  gerarRefreshToken
};
