const ServiceComValidacao = require('./validacaoService');
const statusTermoRepository = require('../repositories/statusTermoRepository');
const {
    validarUnicidadeStatusTermo
} = require('../utils');

module.exports = new ServiceComValidacao(statusTermoRepository, 'Status', validarUnicidadeStatusTermo);