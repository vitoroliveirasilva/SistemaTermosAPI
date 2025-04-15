const ServiceComValidacao = require('../validacaoService');
const statusEquipamentoRepository = require('../../repositories/equipamento/equipamentoStatusRepository');
const {
    validarUnicidadeStatusEquipamento
} = require('../../utils');

module.exports = new ServiceComValidacao(statusEquipamentoRepository, 'Status', validarUnicidadeStatusEquipamento);