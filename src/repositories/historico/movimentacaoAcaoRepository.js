const BaseRepository = require('../baseRepository');
const MovementAction = require('../../models/historico/tb_movimentacaoAcao');

class AcaoMovimentacaoRepository extends BaseRepository {
    constructor() {
        super(MovementAction);
    }

}

module.exports = new AcaoMovimentacaoRepository();