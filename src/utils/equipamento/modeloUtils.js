const modeloRepository = require('../../repositories/equipamento/modeloRepository');
const {
    modeloSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeModelo(dados, id = null) {
    return await validarUnicidadeGenerica(dados, modeloSchema, modeloRepository, ['marca', 'modelo', 'descricao'], id);
}

module.exports = {
    validarUnicidadeModelo
};