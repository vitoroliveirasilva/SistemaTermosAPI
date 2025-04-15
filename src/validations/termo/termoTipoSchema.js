const Joi = require('joi');

const tipoTermoSchema = Joi.object({
    nome: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "O nome do tipo de termo é obrigatório.",
        "string.min": "O nome do tipo de termo deve ter pelo menos 2 caracteres.",
        "string.max": "O nome do tipo de termo deve ter no máximo 50 caracteres."
    }),
    descricao: Joi.string().trim().max(255).optional().messages({
        "string.max": "A descrição do tipo de termo deve ter no máximo 255 caracteres."
    })
});

module.exports = tipoTermoSchema;