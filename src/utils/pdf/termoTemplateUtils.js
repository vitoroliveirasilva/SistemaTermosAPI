const templateTermoRepository = require('../../repositories/pdf/termoTemplateRepository');
const {
    templateTermoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeTermoTemplate(dados, id = null) {
    return await validarUnicidadeGenerica(dados, templateTermoSchema, templateTermoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeTermoTemplate
};