const equipamentoRepository = require('../../repositories/equipamento/equipamentoRepository');
const {
    equipamentoSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeEquipamento(dados, id = null) {
    return await validarUnicidadeGenerica(dados, equipamentoSchema, equipamentoRepository, ['numero_serie'], id);
}

module.exports = {
    validarUnicidadeEquipamento
};