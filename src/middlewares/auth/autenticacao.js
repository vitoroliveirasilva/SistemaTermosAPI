const jwt = require('jsonwebtoken');

// Middleware que verifica a autenticidade do token JWT.
function autenticacao(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensagem: 'Token não fornecido.'
        });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({
            mensagem: 'Formato do token inválido.'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });

        const {
            id,
            nome,
            role
        } = payload;

        // Valida os dados do payload
        if (
            typeof id !== 'number' ||
            typeof nome !== 'string' ||
            typeof role !== 'string'
        ) {
            return res.status(403).json({
                mensagem: 'Token inválido: dados inconsistentes.'
            });
        }

        // Injeta o usuário na requisição
        req.usuario = {
            id,
            nome,
            role
        };

        return next();
    } catch (error) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
}

module.exports = autenticacao;