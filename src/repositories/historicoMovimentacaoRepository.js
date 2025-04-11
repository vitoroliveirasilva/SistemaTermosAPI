const BaseRepository = require('./baseRepository');
const historicoMovimentacao = require('../models/historicoMovimentacao');

class historicoMovimentacaoRepository extends BaseRepository {
    constructor() {
        super(historicoMovimentacao);
    }

}

module.exports = new historicoMovimentacaoRepository();
