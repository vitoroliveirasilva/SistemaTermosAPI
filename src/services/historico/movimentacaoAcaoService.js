const ServiceComValidacao = require('../validacaoService');
const acaoMovimentacaoRepository = require('../../repositories/historico/movimentacaoAcaoRepository');
const {
    validarUnicidadeMovimentacaoAcao
} = require('../../utils');

module.exports = new ServiceComValidacao(acaoMovimentacaoRepository, 'AcaoMovimentacao', validarUnicidadeMovimentacaoAcao);