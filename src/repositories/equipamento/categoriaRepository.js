const BaseRepository = require('../baseRepository');
const Categoria = require('../../models/equipamento/tb_categoria');

class CategoriaRepository extends BaseRepository {
    constructor() {
        super(Categoria);
    }

}

module.exports = new CategoriaRepository();