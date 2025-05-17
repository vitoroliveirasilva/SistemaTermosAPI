const acaoMovimentacaoRepository = require('../../repositories/historico/movimentacaoAcaoRepository');
const {
    movimentacaoAcaoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeMovimentacaoAcao(dados, id = null) {
    return await validarUnicidadeGenerica(dados, movimentacaoAcaoSchema, acaoMovimentacaoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeMovimentacaoAcao
};