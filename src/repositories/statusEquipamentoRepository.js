const BaseRepository = require('./baseRepository');
const EquipamentoStatus = require('../models/EquipamentoStatus');

class StatusEquipamentoRepository extends BaseRepository {
    constructor() {
        super(EquipamentoStatus);
    }

}

module.exports = new StatusEquipamentoRepository();
