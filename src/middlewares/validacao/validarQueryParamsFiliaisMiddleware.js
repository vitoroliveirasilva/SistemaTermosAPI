function validarQueryParamsFiliais(req, res, next) {
    const {
        nome,
        endereco
    } = req.query;

    if (!nome && !endereco) {
        return res.status(400).json({
            erro: "Pelo menos um filtro (nome, endereco) deve ser informado."
        });
    }

    next();
}

module.exports = validarQueryParamsFiliais;