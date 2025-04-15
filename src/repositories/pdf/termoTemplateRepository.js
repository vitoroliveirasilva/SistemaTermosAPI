const BaseRepository = require('../baseRepository');
const TemplateTermo = require('../../models/pdf/tb_termoTemplate');

class TemplateTermoRepository extends BaseRepository {
    constructor() {
        super(TemplateTermo);
    }

}

module.exports = new TemplateTermoRepository();