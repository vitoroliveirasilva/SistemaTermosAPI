const ServiceComValidacao = require('./validacaoService');
const acaoMovimentacaoRepository = require('../repositories/acaoMovimentacaoRepository');
const {
    validarUnicidadeAcaoMovimentacao
} = require('../utils');

module.exports = new ServiceComValidacao(acaoMovimentacaoRepository, 'AcaoMovimentacao', validarUnicidadeAcaoMovimentacao);