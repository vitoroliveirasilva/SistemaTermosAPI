const BaseRepository = require('../baseRepository');
const Equipamento = require('../../models/equipamento/tb_equipamento');

class EquipamentoRepository extends BaseRepository {
    constructor() {
        super(Equipamento);
    }

}

module.exports = new EquipamentoRepository();