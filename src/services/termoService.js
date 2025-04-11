const ServiceComValidacao = require('./validacaoService');
const termoRepository = require('../repositories/termoRepository');
const {
    validarUnicidadeTermo
} = require('../utils');

module.exports = new ServiceComValidacao(termoRepository, 'Termo', validarUnicidadeTermo);