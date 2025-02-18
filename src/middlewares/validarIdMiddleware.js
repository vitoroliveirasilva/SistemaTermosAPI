function validarId(req, res, next) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ erro: 'ID inválido' });
    }
    next();
}

module.exports = validarId;
