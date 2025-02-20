function errorHandler(err, req, res, next) {
    console.error(`[Erro] ${err.message} - Rota: ${req.originalUrl}`);

    if (err.status === 400) {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err.status === 404) {
        return res.status(404).json({
            message: err.message
        });
    }

    const statusCode = err.status || 500;
    return res.status(statusCode).json({
        message: err.message || 'Erro interno do servidor',
        status: statusCode
    });
}

module.exports = errorHandler;