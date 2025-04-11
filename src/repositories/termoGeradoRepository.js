const BaseRepository = require('./baseRepository');
const TermoGerado = require('../models/TermoGerado');

class TermoGeradoRepository extends BaseRepository {
    constructor() {
        super(TermoGerado);
    }

}

module.exports = new TermoGeradoRepository();
