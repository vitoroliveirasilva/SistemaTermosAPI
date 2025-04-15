const statusTermoRepository = require('../../repositories/termo/termoStatusRepository');
const {
    statusTermoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeTermoStatus(dados, id = null) {
    return await validarUnicidadeGenerica(dados, statusTermoSchema, statusTermoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeTermoStatus
};