const BaseRepository = require('./baseRepository');
const Termo = require('../models/Termo');

class TermoRepository extends BaseRepository {
    constructor() {
        super(Termo);
    }

}

module.exports = new TermoRepository();
