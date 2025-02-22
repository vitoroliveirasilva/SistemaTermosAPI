const BaseRepository = require('./baseRepository');
const Categoria = require('../models/Categoria');

class CategoriaRepository extends BaseRepository {
    constructor() {
        super(Categoria);
    }

}

module.exports = new CategoriaRepository();
