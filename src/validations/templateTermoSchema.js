const Joi = require('joi');

const templateTermoSchema = Joi.object({
    nome: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "O nome do template é obrigatório.",
        "string.min": "O nome do template deve ter pelo menos 2 caracteres.",
        "string.max": "O nome do template deve ter no máximo 50 caracteres."
    }),
    titulo: Joi.string().trim().min(2).max(20).required().messages({
        "string.empty": "O título do template é obrigatório.",
        "string.min": "O título do template deve ter pelo menos 2 caracteres.",
        "string.max": "O título do template deve ter no máximo 20 caracteres."
    }),
    subtitulo: Joi.string().trim().min(2).max(50).optional().messages({
        "string.min": "O subtítulo do template deve ter pelo menos 2 caracteres.",
        "string.max": "O subtítulo do template deve ter no máximo 50 caracteres."
    }),
    conteudo: Joi.string().trim().min(10).max(5000).required().messages({
        "string.empty": "O conteúdo do template é obrigatório.",
        "string.min": "O conteúdo do template deve ter pelo menos 10 caracteres.",
        "string.max": "O conteúdo do template deve ter no máximo 5000 caracteres."
    })
});

module.exports = templateTermoSchema;