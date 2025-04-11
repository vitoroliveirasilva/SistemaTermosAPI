const ServiceComValidacao = require('./validacaoService');
const modeloRepository = require('../repositories/modeloRepository');
const {
    validarUnicidadeModelo
} = require('../utils');

module.exports = new ServiceComValidacao(modeloRepository, 'Modelo', validarUnicidadeModelo);