const Joi = require('joi');

const historicoMovimentacaoSchema = Joi.object({
    equipamento_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O ID do equipamento é obrigatório.',
        'number.base': 'O ID do equipamento deve ser um número.',
        'number.integer': 'O ID do equipamento deve ser um número inteiro.',
        'number.positive': 'O ID do equipamento deve ser positivo.'
    }),
    usuario_id: Joi.number().integer().positive().allow(null).optional().messages({
        'number.base': 'O ID do usuário deve ser um número.',
        'number.integer': 'O ID do usuário deve ser um número inteiro.',
        'number.positive': 'O ID do usuário deve ser positivo.'
    }),
    acao_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O ID da ação é obrigatório.',
        'number.base': 'O ID da ação deve ser um número.',
        'number.integer': 'O ID da ação deve ser um número inteiro.',
        'number.positive': 'O ID da ação deve ser positivo.'
    }),
    data_movimentacao: Joi.date().optional().messages({
        'date.base': 'A data da movimentação deve ser uma data válida.'
    }),
    observacao: Joi.string().trim().allow('', null).optional().messages({
        'string.base': 'A observação deve ser um texto.'
    })
});

module.exports = historicoMovimentacaoSchema;