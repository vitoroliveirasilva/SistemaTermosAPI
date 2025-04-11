const ServiceComValidacao = require('./validacaoService');
const filialRepository = require('../repositories/filialRepository');
const {
    validarUnicidadeFilial
} = require('../utils');

module.exports = new ServiceComValidacao(filialRepository, 'Filial', validarUnicidadeFilial);