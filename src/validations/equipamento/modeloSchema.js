const Joi = require('joi');

const modeloSchema = Joi.object({
    marca: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "O nome da marca é obrigatório.",
        "string.min": "O nome da marca deve ter pelo menos 2 caracteres.",
        "string.max": "O nome da marca deve ter no máximo 50 caracteres."
    }),
    modelo: Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "O nome do modelo é obrigatório.",
        "string.min": "O nome do modelo deve ter pelo menos 2 caracteres.",
        "string.max": "O nome do modelo deve ter no máximo 100 caracteres."
    }),
    descricao: Joi.string().trim().min(2).required().messages({
        "string.empty": "A descrição é obrigatória.",
        "string.min": "A descrição deve ter no mínimo 2 caracteres.",
        "any.required": "A descrição é obrigatória."
    })    
});

module.exports = modeloSchema;