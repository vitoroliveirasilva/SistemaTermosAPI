const Joi = require('joi');

const equipamentoSchema = Joi.object({
    numero_serie: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "O número de série é obrigatório.",
        "string.min": "O número de série deve ter pelo menos 2 caracteres.",
        "string.max": "O número de série deve ter no máximo 50 caracteres."
    })
});

module.exports = equipamentoSchema;