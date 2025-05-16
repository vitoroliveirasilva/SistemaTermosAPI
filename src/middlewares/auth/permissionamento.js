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

        const papel = String(req.usuario.papel || '').toLowerCase();

        if (!rolesValidos.includes(papel)) {
            return res.status(403).json({
                mensagem: `Papel não reconhecido: ${papel}`
            });
        }

        const autorizado = permissoesPermitidas
            .map(p => p.toLowerCase())
            .includes(papel);

        if (!autorizado) {
            return res.status(403).json({
                mensagem: `Permissão negada para: ${papel}`
            });
        }

        return next();
    };
}

module.exports = verificarPermissao;