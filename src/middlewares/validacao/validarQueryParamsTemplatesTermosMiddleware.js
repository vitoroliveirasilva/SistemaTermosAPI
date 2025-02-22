function validarQueryParamsTemplatesTermos(req, res, next) {
    const {
        nome,
        titulo,
        subtitulo,
        conteudo
    } = req.query;

    if (!nome && !titulo && !subtitulo && !conteudo) {
        return res.status(400).json({
            erro: "Para continuar, por favor, informe pelo menos um filtro (nome, título, subtítulo ou conteúdo)."
        });
    }

    next();
}

module.exports = validarQueryParamsTemplatesTermos;