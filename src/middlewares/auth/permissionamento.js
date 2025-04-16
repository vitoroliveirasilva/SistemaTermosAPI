const ROLES = require('../../constants/roles');

function verificarPermissao(...permissoesPermitidas) {
    const rolesValidos = Object.values(ROLES).map(p => p.toLowerCase());

    if (!Array.isArray(permissoesPermitidas) || permissoesPermitidas.length === 0) {
        throw new Error('Nenhuma permissão definida.');
    }

    return (req, res, next) => {
        if (!req.usuario || typeof req.usuario !== 'object') {
            return res.status(401).json({
                mensagem: 'Usuário não autenticado.'
            });
        }

        const role = String(req.usuario.role || '').toLowerCase();

        if (!rolesValidos.includes(role)) {
            return res.status(403).json({
                mensagem: `Não é reconhecido: ${role}`
            });
        }

        const autorizado = permissoesPermitidas
            .map(p => p.toLowerCase())
            .includes(role);

        if (!autorizado) {
            return res.status(403).json({
                mensagem: `Permissão negada para: ${role}`
            });
        }

        return next();
    };
}

module.exports = verificarPermissao;