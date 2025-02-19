function validarQueryParamsUsuarios(req, res, next) {
    const {
        nome,
        email,
        status
    } = req.query;

    if (!nome && !email && !status) {
        return res.status(400).json({
            erro: "Pelo menos um filtro (nome, email, status) deve ser informado."
        });
    }

    if (status && !['ativo', 'inativo', 'pendente'].includes(status.toLowerCase())) {
        return res.status(400).json({
            erro: "Status inválido. Valores permitidos: ativo, inativo, pendente."
        });
    }

    next();
}

module.exports = validarQueryParamsUsuarios;