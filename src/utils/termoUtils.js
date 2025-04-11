const {
    termoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida os dados de um termo com base no schema definido.
 * @param {Object} dados - Dados do termo.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso os dados estejam inválidos.
*/
function validarUnicidadeTermo(dados) {
    // Como não há unicidade, é validado apenas o schema JOI
    validarDados(dados, termoSchema);
}

module.exports = {
    validarUnicidadeTermo
};
