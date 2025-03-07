function validarQueryParamsTiposTermos(req, res, next) {
    const {
        nome,
        descricao
    } = req.query;

    if (!nome && !descricao) {
        return res.status(400).json({
            erro: "Para continuar, por favor, informe pelo menos um filtro (nome ou descrição)."
        });
    }

    next();
}

module.exports = validarQueryParamsTiposTermos;