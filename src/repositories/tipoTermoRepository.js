const BaseRepository = require('./baseRepository');
const TermType = require('../models/TermType');

class TipoTermoRepository extends BaseRepository {
    constructor() {
        super(TermType);
    }

}

module.exports = new TipoTermoRepository();
