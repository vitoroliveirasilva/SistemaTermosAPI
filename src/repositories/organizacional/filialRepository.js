const BaseRepository = require('../baseRepository');
const Filial = require('../../models/organizacional/tb_filial');

class FilialRepository extends BaseRepository {
    constructor() {
        super(Filial);
    }

}

module.exports = new FilialRepository();