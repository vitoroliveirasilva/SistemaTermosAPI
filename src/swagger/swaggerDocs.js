const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

// Gera o swagger.yaml final automaticamente
require('./mergeSwagger');

function setupSwagger(app) {
    const swaggerDocument = yaml.load(
        fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8')
    );

    const swaggerOptions = {
        explorer: true,
        customSiteTitle: 'API Sistema de Termos',
        customCss: `.swagger-ui .topbar { background-color: #1e272e }`
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
    console.info('Swagger disponível em: http://localhost:3000/api-docs');
}

module.exports = setupSwagger;