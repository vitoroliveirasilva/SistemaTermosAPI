const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Termos de Responsabilidade e Gestão de Estoque',
            version: '1.0.0',
            description: 'Documentação da API em Node.js para gerenciamento de termos de responsabilidade e devolução de equipamentos. Permite que empresas controlem a entrega de equipamentos aos usuários, gerando termos de assinatura para atribuir responsabilidade.',
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Servidor local de desenvolvimento',
        }, ],
    },
    apis: ['./src/docs/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.info('Swagger disponível em: http://localhost:3000/api-docs');
}

module.exports = setupSwagger;