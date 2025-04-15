const tipoTermoRepository = require('../../repositories/termo/termoTipoRepository');
const {
    tipoTermoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeTermoTipo(dados, id = null) {
    return await validarUnicidadeGenerica(dados, tipoTermoSchema, tipoTermoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeTermoTipo
};