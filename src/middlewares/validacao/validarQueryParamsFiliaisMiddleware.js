function validarQueryParamsFiliais(req, res, next) {
    const {
        nome,
        endereco
    } = req.query;

    if (!nome && !endereco) {
        return res.status(400).json({
            erro: "Para continuar, por favor, informe pelo menos um filtro (nome ou endereço)."
        });
    }

    next();
}

module.exports = validarQueryParamsFiliais;