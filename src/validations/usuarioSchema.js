const Joi = require('joi');

// Expressões Regulares
const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Valores do ENUM de status
const statusValores = ['ativo', 'inativo', 'pendente'];

// Esquema de validação do usuário
const usuarioSchema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(100)
        .pattern(regexNome)
        .required()
        .messages({
            'string.base': 'Nome deve ser uma string válida.',
            'string.min': 'Nome deve ter pelo menos 3 caracteres.',
            'string.max': 'Nome deve ter no máximo 100 caracteres.',
            'string.pattern.base': 'Nome deve conter apenas letras, espaços e acentos.',
            'any.required': 'Nome é obrigatório.'
        }),

    email: Joi.string()
        .email({
            tlds: {
                allow: false
            }
        })
        .required()
        .messages({
            'string.email': 'E-mail inválido.',
            'any.required': 'E-mail é obrigatório.'
        }),

    senha: Joi.string()
        .pattern(regexSenha)
        .required()
        .messages({
            'string.pattern.base': 'A senha deve ter pelo menos 8 caracteres, incluindo: uma maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&).',
            'any.required': 'Senha é obrigatória.'
        }),

    status: Joi.string()
        .valid(...statusValores)
        .optional()
        .messages({
            'any.only': `O status deve ser um dos seguintes valores: ${statusValores.join(', ')}.`,
        })
});

const usuarioUpdateSchema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(100)
        .pattern(regexNome)
        .messages({
            'string.base': 'Nome deve ser uma string válida.',
            'string.min': 'Nome deve ter pelo menos 3 caracteres.',
            'string.max': 'Nome deve ter no máximo 100 caracteres.',
            'string.pattern.base': 'Nome deve conter apenas letras, espaços e acentos.',
        }),


    email: Joi.string()
        .email({
            tlds: {
                allow: false
            }
        })
        .messages({
            'string.email': 'E-mail inválido.',
        }),

    senha: Joi.string()
        .pattern(regexSenha)
        .messages({
            'string.pattern.base': 'A senha deve ter pelo menos 8 caracteres, incluindo: uma maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&).',
        }),

    status: Joi.string()
        .valid(...statusValores)
        .messages({
            'any.only': `O status deve ser um dos seguintes valores: ${statusValores.join(', ')}.`,
        })
}).min(1); // Garante que pelo menos um campo seja enviado na atualização


module.exports = {
    usuarioSchema,
    usuarioUpdateSchema
};