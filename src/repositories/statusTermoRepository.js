const BaseRepository = require('./baseRepository');
const TermStatus = require('../models/TermStatus');

class statusTermoRepository extends BaseRepository {
    constructor() {
        super(TermStatus);
    }

}

module.exports = new statusTermoRepository();
