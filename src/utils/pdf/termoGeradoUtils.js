const {
    termoGeradoSchema
} = require('../../validations');
const {
    validarDados
} = require('../validacaoUnicidadeGenerica');

/*
 * Valida os dados de um termo gerado com base no schema definido.
 * @param {Object} dados - Dados do termo.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso os dados estejam inválidos.
*/
function validarUnicidadeTermoGerado(dados) {
    // Como não há unicidade, é validado apenas o schema JOI
    validarDados(dados, termoGeradoSchema);
}

module.exports = {
    validarUnicidadeTermoGerado
};