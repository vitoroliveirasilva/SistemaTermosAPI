const acaoMovimentacaoRepository = require('../../repositories/historico/movimentacaoAcaoRepository');
const {
    acaoMovimentacaoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeMovimentacaoAcao(dados, id = null) {
    return await validarUnicidadeGenerica(dados, acaoMovimentacaoSchema, acaoMovimentacaoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeMovimentacaoAcao
};