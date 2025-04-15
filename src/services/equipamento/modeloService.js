const ServiceComValidacao = require('../validacaoService');
const modeloRepository = require('../../repositories/equipamento/modeloRepository');
const {
    validarUnicidadeModelo
} = require('../../utils');

module.exports = new ServiceComValidacao(modeloRepository, 'Modelo', validarUnicidadeModelo);