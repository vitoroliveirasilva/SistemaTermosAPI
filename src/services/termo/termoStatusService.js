const ServiceComValidacao = require('../validacaoService');
const statusTermoRepository = require('../../repositories/termo/termoStatusRepository');
const {
    validarUnicidadeStatusTermo
} = require('../../utils');

module.exports = new ServiceComValidacao(statusTermoRepository, 'Status', validarUnicidadeStatusTermo);