const statusTermoRepository = require('../../repositories/termo/termoStatusRepository');
const {
    termoStatusSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeTermoStatus(dados, id = null) {
    return await validarUnicidadeGenerica(dados, termoStatusSchema, statusTermoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeTermoStatus
};