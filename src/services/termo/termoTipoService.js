const ServiceComValidacao = require('../validacaoService');
const tipoTermoRepository = require('../../repositories/termo/termoTipoRepository');
const {
    validarUnicidadeTermoTipo
} = require('../../utils');

module.exports = new ServiceComValidacao(tipoTermoRepository, 'Tipo', validarUnicidadeTermoTipo);