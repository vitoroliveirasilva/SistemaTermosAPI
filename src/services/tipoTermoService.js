const ServiceComValidacao = require('./validacaoService');
const tipoTermoRepository = require('../repositories/tipoTermoRepository');
const {
    validarUnicidadeTipoTermo
} = require('../utils');

module.exports = new ServiceComValidacao(tipoTermoRepository, 'Tipo', validarUnicidadeTipoTermo);