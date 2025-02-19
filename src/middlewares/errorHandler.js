function errorHandler(err, req, res, next) {
    console.error(`[Erro] ${err.message} - Rota: ${req.originalUrl}`);

    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        erro: err.message || 'Erro interno do servidor',
        status: statusCode
    });
}

module.exports = errorHandler;