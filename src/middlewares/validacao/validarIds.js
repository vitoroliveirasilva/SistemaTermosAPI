const {
    validarId
} = require('../../utils/validacaoId');

function validarIds(req, res, next) {
    const parametrosInvalidos = Object.entries(req.params).find(([key, value]) => {
        const {
            valido,
            mensagem
        } = validarId(value);
        if (!valido) {
            res.status(400).json({
                erro: mensagem
            });
            return true; // Interrompe o `find()` se encontrar um erro
        }
        return false;
    });

    if (!parametrosInvalidos) {
        next();
    }
}

module.exports = validarIds;