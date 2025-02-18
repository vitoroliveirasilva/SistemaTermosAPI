/*
 * Valida os dados com base no esquema Joi fornecido.
 * @param {Object} dados - Objeto de entrada.
 * @param {Object} schema - Esquema Joi de validação.
 * @returns {Object} - Dados validados ou erro.
*/
function validarDados(dados, schema) {
    const {
        error,
        value
    } = schema.validate(dados, {
        abortEarly: false
    });

    if (error) {
        throw new Error(`Erro de validação: ${error.details.map(d => d.message).join(', ')}`);
    }

    return value;
}

module.exports = {
    validarDados
};