function validarIds(req, res, next) {
    for (const [key, value] of Object.entries(req.params)) {
        if (isNaN(value) || parseInt(value) <= 0) {
            return res.status(400).json({
                erro: `O parâmetro "${key}" possui um ID inválido. Deve ser um número positivo.`
            });
        }
    }
    next();
}

module.exports = validarIds;