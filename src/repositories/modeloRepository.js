const BaseRepository = require('./baseRepository');
const Modelo = require('../models/Modelo');

class ModeloRepository extends BaseRepository {
    constructor() {
        super(Modelo);
    }

}

module.exports = new ModeloRepository();
