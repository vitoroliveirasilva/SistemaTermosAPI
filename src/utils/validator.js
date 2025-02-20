/*
 * Valida os dados com base no esquema Joi fornecido.
 * @param {Object} dados - Objeto de entrada a ser validado.
 * @param {Object} schema - Esquema Joi de validação.
 * @returns {Object} - Retorna os dados validados sem atributos desconhecidos.
 * @throws {Object} - Erro estruturado contendo status e mensagem caso a validação falhe.
*/
function validarDados(dados, schema) {
    const {
        error,
        value
    } = schema.validate(dados, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        throw new Error(`Erro de validação: ${error.details.map(d => d.message).join(', ')}`);
    }

    return value;
}

module.exports = {
    validarDados
};