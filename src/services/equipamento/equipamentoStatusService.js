const ServiceComValidacao = require('../validacaoService');
const statusEquipamentoRepository = require('../../repositories/equipamento/equipamentoStatusRepository');
const {
    validarUnicidadeEquipamentoStatus
} = require('../../utils');

module.exports = new ServiceComValidacao(statusEquipamentoRepository, 'Status', validarUnicidadeEquipamentoStatus);