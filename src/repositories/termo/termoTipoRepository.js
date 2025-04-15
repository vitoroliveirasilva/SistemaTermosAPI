const BaseRepository = require('../baseRepository');
const TermType = require('../../models/termo/tb_termoTipo');

class TipoTermoRepository extends BaseRepository {
    constructor() {
        super(TermType);
    }

}

module.exports = new TipoTermoRepository();