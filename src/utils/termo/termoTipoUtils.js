const tipoTermoRepository = require('../../repositories/termo/termoTipoRepository');
const {
    termoTipoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeTermoTipo(dados, id = null) {
    return await validarUnicidadeGenerica(dados, termoTipoSchema, tipoTermoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeTermoTipo
};