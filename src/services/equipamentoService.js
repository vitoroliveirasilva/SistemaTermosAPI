const ServiceComValidacao = require('./validacaoService');
const equipamentoRepository = require('../repositories/equipamentoRepository');
const {
    validarUnicidadeEquipamento
} = require('../utils');

module.exports = new ServiceComValidacao(equipamentoRepository, 'Equipamento', validarUnicidadeEquipamento);