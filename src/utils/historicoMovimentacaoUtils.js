const {
    historicoMovimentacaoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida os dados de um historico de movimentação com base no schema definido.
 * @param {Object} dados - Dados do termo.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso os dados estejam inválidos.
*/
function validarUnicidadeHistoricoMovimentacao(dados) {
    // Como não há unicidade, é validado apenas o schema JOI
    validarDados(dados, historicoMovimentacaoSchema);
}

module.exports = {
    validarUnicidadeHistoricoMovimentacao
};
