function validarQueryParamsStatusTermo(req, res, next) {
    const {
        nome
    } = req.query;

    if (!nome) {
        return res.status(400).json({
            erro: "Para continuar, por favor, informe o nome do status do termo."
        });
    }

    next();
}

module.exports = validarQueryParamsStatusTermo;