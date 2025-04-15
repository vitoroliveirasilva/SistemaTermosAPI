const ServiceComValidacao = require('../validacaoService');
const templateTermoRepository = require('../../repositories/pdf/termoTemplateRepository');
const {
    validarUnicidadeTemplateTermo
} = require('../../utils');

module.exports = new ServiceComValidacao(templateTermoRepository, 'Template', validarUnicidadeTemplateTermo);