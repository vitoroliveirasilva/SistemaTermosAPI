const BaseRepository = require('../baseRepository');
const Modelo = require('../../models/equipamento/tb_modelo');

class ModeloRepository extends BaseRepository {
    constructor() {
        super(Modelo);
    }

}

module.exports = new ModeloRepository();