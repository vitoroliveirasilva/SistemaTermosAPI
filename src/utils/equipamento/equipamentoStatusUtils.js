const statusEquipamentoRepository = require('../../repositories/equipamento/equipamentoStatusRepository');
const {
    equipamentoStatusSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeEquipamentoStatus(dados, id = null) {
    return await validarUnicidadeGenerica(dados, equipamentoStatusSchema, statusEquipamentoRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeEquipamentoStatus
};