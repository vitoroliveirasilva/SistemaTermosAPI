const filialRepository = require('../../repositories/organizacional/filialRepository');
const {
    filialSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

async function validarUnicidadeFilial(dados, id = null) {
    return await validarUnicidadeGenerica(dados, filialSchema, filialRepository, ['nome', 'endereco'], id);
}

module.exports = {
    validarUnicidadeFilial
};