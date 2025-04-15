const ServiceComValidacao = require('../validacaoService');
const tipoTermoRepository = require('../../repositories/termo/termoTipoRepository');
const {
    validarUnicidadeTipoTermo
} = require('../../utils');

module.exports = new ServiceComValidacao(tipoTermoRepository, 'Tipo', validarUnicidadeTipoTermo);