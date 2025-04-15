const BaseRepository = require('../baseRepository');
const Termo = require('../../models/termo/tb_termo');

class TermoRepository extends BaseRepository {
    constructor() {
        super(Termo);
    }

}

module.exports = new TermoRepository();