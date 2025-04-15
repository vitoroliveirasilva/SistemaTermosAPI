const ServiceComValidacao = require('../validacaoService');
const acaoMovimentacaoRepository = require('../../repositories/historico/movimentacaoAcaoRepository');
const {
    validarUnicidadeAcaoMovimentacao
} = require('../../utils');

module.exports = new ServiceComValidacao(acaoMovimentacaoRepository, 'AcaoMovimentacao', validarUnicidadeAcaoMovimentacao);