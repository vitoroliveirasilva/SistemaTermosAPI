const ServiceComValidacao = require('./validacaoService');
const categoriaRepository = require('../repositories/categoriaRepository');
const {
    validarUnicidadeCategoria
} = require('../utils');

module.exports = new ServiceComValidacao(categoriaRepository, 'Categoria', validarUnicidadeCategoria);