const ServiceComValidacao = require('../validacaoService');
const historicoMovimentacaoRepository = require('../../repositories/historico/movimentacaoHistoricoRepository');
const {
    validarUnicidadeHistoricoMovimentacao
} = require('../../utils');

module.exports = new ServiceComValidacao(historicoMovimentacaoRepository, 'HistoricoMovimentacao', validarUnicidadeHistoricoMovimentacao);