const Joi = require('joi');

const filialSchema = Joi.object({
    nome: Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "O nome da filial é obrigatório.",
        "string.min": "O nome deve ter pelo menos 2 caracteres.",
        "string.max": "O nome deve ter no máximo 100 caracteres."
    }),
    endereco: Joi.string().trim().max(255).optional().messages({
        "string.max": "O endereço deve ter no máximo 255 caracteres."
    })
});

module.exports = filialSchema;