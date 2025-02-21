const BaseRepository = require('./baseRepository');
const Filial = require('../models/Filial');

class FilialRepository extends BaseRepository {
    constructor() {
        super(Filial);
    }

}

module.exports = new FilialRepository();
