const jwt = require('jsonwebtoken');

/*
 * Middleware que valida o accessToken enviado no header Authorization.
 * Injeta os dados do usuário autenticado em `req.usuario`.
*/
function autenticacao(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const [tipo, token] = authHeader.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Formato do token inválido.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });

    const { id, nome, papel } = payload;

    // Valida a integridade dos dados do token
    if (
      typeof id !== 'number' ||
      typeof nome !== 'string' ||
      typeof papel !== 'string'
    ) {
      return res.status(403).json({
        mensagem: 'Token inválido: dados inconsistentes.'
      });
    }

    // Injeta os dados do usuário autenticado na requisição
    req.usuario = { id, nome, papel };

    return next();
  } catch (error) {
    console.error('[Auth] Erro ao validar token:', error.message);
    return res.status(401).json({
      mensagem: 'Token inválido ou expirado.'
    });
  }
}

module.exports = autenticacao;
