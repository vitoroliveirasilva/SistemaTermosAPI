const BaseRepository = require('./baseRepository');
const TemplateTermo = require('../models/TemplateTermo');

class TemplateTermoRepository extends BaseRepository {
    constructor() {
        super(TemplateTermo);
    }

}

module.exports = new TemplateTermoRepository();
