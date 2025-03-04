const BaseRepository = require('./baseRepository');
const MovementAction = require('../models/MovementAction');

class AcaoMovimentacaoRepository extends BaseRepository {
    constructor() {
        super(MovementAction);
    }

}

module.exports = new AcaoMovimentacaoRepository();
