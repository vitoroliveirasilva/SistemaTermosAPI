const BaseRepository = require('../baseRepository');
const TermStatus = require('../../models/termo/tb_termoStatus');

class statusTermoRepository extends BaseRepository {
    constructor() {
        super(TermStatus);
    }

}

module.exports = new statusTermoRepository();