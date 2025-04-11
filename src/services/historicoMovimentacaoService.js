const ServiceComValidacao = require('./validacaoService');
const historicoMovimentacaoRepository = require('../repositories/historicoMovimentacaoRepository');
const {
    validarUnicidadeHistoricoMovimentacao
} = require('../utils');

module.exports = new ServiceComValidacao(historicoMovimentacaoRepository, 'HistoricoMovimentacao', validarUnicidadeHistoricoMovimentacao);