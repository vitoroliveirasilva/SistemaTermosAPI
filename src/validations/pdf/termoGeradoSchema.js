const Joi = require('joi');

const termoGeradoSchema = Joi.object({
    termo_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O ID do termo é obrigatório.',
        'number.base': 'O ID do termo deve ser um número.',
        'number.integer': 'O ID do termo deve ser um número inteiro.',
        'number.positive': 'O ID do termo deve ser positivo.'
    }),
    template_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O ID do template é obrigatório.',
        'number.base': 'O ID do template deve ser um número.',
        'number.integer': 'O ID do template deve ser um número inteiro.',
        'number.positive': 'O ID do template deve ser positivo.'
    }),
    caminho_pdf: Joi.string().trim().max(255).required().messages({
        'any.required': 'O caminho do PDF é obrigatório.',
        'string.base': 'O caminho do PDF deve ser um texto.',
        'string.max': 'O caminho do PDF deve ter no máximo 255 caracteres.',
        'string.empty': 'O caminho do PDF não pode ser vazio.'
    }),
    data_geracao: Joi.date().optional().messages({
        'date.base': 'A data de geração deve ser uma data válida.'
    })
});

module.exports = termoGeradoSchema;