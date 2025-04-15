const BaseRepository = require('../baseRepository');
const TermoGerado = require('../../models/pdf/tb_termoGerado');

class TermoGeradoRepository extends BaseRepository {
    constructor() {
        super(TermoGerado);
    }

}

module.exports = new TermoGeradoRepository();