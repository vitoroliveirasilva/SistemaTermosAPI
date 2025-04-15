const ServiceComValidacao = require('../validacaoService');
const termoGeradoRepository = require('../../repositories/pdf/termoGeradoRepository');
const {
    validarUnicidadeTermoGerado
} = require('../../utils');

module.exports = new ServiceComValidacao(termoGeradoRepository, 'TermoGerado', validarUnicidadeTermoGerado);