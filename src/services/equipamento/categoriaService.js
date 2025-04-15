const ServiceComValidacao = require('../validacaoService');
const categoriaRepository = require('../../repositories/equipamento/categoriaRepository');
const {
    validarUnicidadeCategoria
} = require('../../utils');

module.exports = new ServiceComValidacao(categoriaRepository, 'Categoria', validarUnicidadeCategoria);