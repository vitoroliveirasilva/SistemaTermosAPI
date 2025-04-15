const Joi = require('joi');

const statusTermoSchema = Joi.object({
    nome: Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "O nome do status do termo é obrigatório.",
        "string.min": "O nome deve ter pelo menos 2 caracteres.",
        "string.max": "O nome deve ter no máximo 100 caracteres."
    })
});

module.exports = statusTermoSchema;