const BaseRepository = require('./baseRepository');
const Equipamento = require('../models/Equipamento');

class EquipamentoRepository extends BaseRepository {
    constructor() {
        super(Equipamento);
    }

}

module.exports = new EquipamentoRepository();
