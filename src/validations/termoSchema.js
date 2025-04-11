const Joi = require('joi');

const termoSchema = Joi.object({
    usuario_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O ID do usuário é obrigatório.',
        'number.base': 'O ID do usuário deve ser um número.',
        'number.integer': 'O ID do usuário deve ser um número inteiro.',
        'number.positive': 'O ID do usuário deve ser positivo.'
    }),
    equipamento_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O ID do equipamento é obrigatório.',
        'number.base': 'O ID do equipamento deve ser um número.',
        'number.integer': 'O ID do equipamento deve ser um número inteiro.',
        'number.positive': 'O ID do equipamento deve ser positivo.'
    }),
    criador_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O ID do criador é obrigatório.',
        'number.base': 'O ID do criador deve ser um número.',
        'number.integer': 'O ID do criador deve ser um número inteiro.',
        'number.positive': 'O ID do criador deve ser positivo.'
    }),
    tipo_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O tipo de termo é obrigatório.',
        'number.base': 'O tipo de termo deve ser um número.',
        'number.integer': 'O tipo de termo deve ser um número inteiro.',
        'number.positive': 'O tipo de termo deve ser positivo.'
    }),
    status_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O status do termo é obrigatório.',
        'number.base': 'O status do termo deve ser um número.',
        'number.integer': 'O status do termo deve ser um número inteiro.',
        'number.positive': 'O status do termo deve ser positivo.'
    }),
    data_criacao: Joi.date().optional().messages({
        'date.base': 'A data de criação deve ser uma data válida.'
    }),
    data_assinatura: Joi.date().allow(null).optional().messages({
        'date.base': 'A data de assinatura deve ser uma data válida.'
    }),
    observacao: Joi.string().trim().allow('', null).optional().messages({
        'string.base': 'A observação deve ser um texto.'
    })
});

module.exports = termoSchema;