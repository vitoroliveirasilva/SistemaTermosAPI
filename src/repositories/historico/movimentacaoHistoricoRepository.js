const BaseRepository = require('../baseRepository');
const historicoMovimentacao = require('../../models/historico/tb_movimentacaoHistorico');

class historicoMovimentacaoRepository extends BaseRepository {
    constructor() {
        super(historicoMovimentacao);
    }

}

module.exports = new historicoMovimentacaoRepository();