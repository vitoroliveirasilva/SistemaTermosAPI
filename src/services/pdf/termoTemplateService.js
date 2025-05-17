const ServiceComValidacao = require('../validacaoService');
const templateTermoRepository = require('../../repositories/pdf/termoTemplateRepository');
const {
    validarUnicidadeTermoTemplate
} = require('../../utils');

module.exports = new ServiceComValidacao(templateTermoRepository, 'Template', validarUnicidadeTermoTemplate);