const Joi = require('joi');

const categoriaSchema = Joi.object({
    nome: Joi.string().min(2).max(50).required().messages({
        "string.empty": "O nome da categoria é obrigatório.",
        "string.min": "O nome da categoria deve ter pelo menos 2 caracteres.",
        "string.max": "O nome da categoria deve ter no máximo 50 caracteres."
    }),
    descricao: Joi.string().max(255).optional().messages({
        "string.max": "O nome da categoria deve ter no máximo 255 caracteres."
    })
});

module.exports = categoriaSchema;