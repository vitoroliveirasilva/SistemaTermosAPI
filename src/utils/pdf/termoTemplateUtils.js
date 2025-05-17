const templateTermoRepository = require('../../repositories/pdf/termoTemplateRepository');
const {
    termoTemplateSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeTermoTemplate(dados, id = null) {
    return await validarUnicidadeGenerica(dados, termoTemplateSchema, templateTermoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeTermoTemplate
};