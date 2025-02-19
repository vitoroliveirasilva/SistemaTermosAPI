function validarId(req, res, next) {
    const {
        id
    } = req.params;

    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
            erro: 'ID inválido. O ID deve ser um número positivo.'
        });
    }

    next();
}

module.exports = validarId;