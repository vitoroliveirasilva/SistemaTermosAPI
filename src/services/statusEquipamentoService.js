const ServiceComValidacao = require('./validacaoService');
const statusEquipamentoRepository = require('../repositories/statusEquipamentoRepository');
const {
    validarUnicidadeStatusEquipamento
} = require('../utils');

module.exports = new ServiceComValidacao(statusEquipamentoRepository, 'Status', validarUnicidadeStatusEquipamento);