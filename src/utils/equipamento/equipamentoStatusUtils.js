const statusEquipamentoRepository = require('../../repositories/equipamento/equipamentoStatusRepository');
const {
    statusEquipamentoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeEquipamentoStatus(dados, id = null) {
    return await validarUnicidadeGenerica(dados, statusEquipamentoSchema, statusEquipamentoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeEquipamentoStatus
};