const ServiceComValidacao = require('../validacaoService');
const statusTermoRepository = require('../../repositories/termo/termoStatusRepository');
const {
    validarUnicidadeTermoStatus
} = require('../../utils');

module.exports = new ServiceComValidacao(statusTermoRepository, 'Status', validarUnicidadeTermoStatus);