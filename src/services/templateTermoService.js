const ServiceComValidacao = require('./validacaoService');
const templateTermoRepository = require('../repositories/templateTermoRepository');
const {
    validarUnicidadeTemplateTermo
} = require('../utils');

module.exports = new ServiceComValidacao(templateTermoRepository, 'Template', validarUnicidadeTemplateTermo);