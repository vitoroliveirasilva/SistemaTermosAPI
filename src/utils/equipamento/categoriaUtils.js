const categoriaRepository = require('../../repositories/equipamento/categoriaRepository');
const {
    categoriaSchema
} = require('../../validations');
const {
    validarUnicidadeGenerica
} = require('../validacaoUnicidadeGenerica');

// Valida a unicidade utilizando validador genérico.
async function validarUnicidadeCategoria(dados, id = null) {
    await validarUnicidadeGenerica(dados, categoriaSchema, categoriaRepository, ['nome'], id);
}

module.exports = {
    validarUnicidadeCategoria
};