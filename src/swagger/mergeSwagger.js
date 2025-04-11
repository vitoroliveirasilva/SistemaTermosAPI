const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const docsDir = path.join(__dirname, 'partials');
const outputPath = path.join(__dirname, 'swagger.yaml');

const spec = {
  openapi: '3.0.0',
  info: {
    title: 'API de Termos de Responsabilidade e Gestão de Estoque',
    version: '1.0.0',
    description: 'Documentação da API em Node.js para gerenciamento de termos de responsabilidade e devolução de equipamentos.'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local de desenvolvimento'
    }
  ],
  tags: [],
  paths: {},
  components: {}
};

// Combina arquivos separados
fs.readdirSync(docsDir).forEach(file => {
  if (file.endsWith('.swagger.yaml')) {
    const data = yaml.load(fs.readFileSync(path.join(docsDir, file), 'utf8'));

    if (data.tags) {
      data.tags.forEach(tag => {
        if (!spec.tags.find(t => t.name === tag.name)) {
          spec.tags.push(tag);
        }
      });
    }

    if (data.paths) {
      Object.entries(data.paths).forEach(([route, ops]) => {
        spec.paths[route] = { ...(spec.paths[route] || {}), ...ops };
      });
    }

    if (data.components) {
      spec.components.schemas = {
        ...(spec.components.schemas || {}),
        ...(data.components.schemas || {})
      };
    }
  }
});

// Ordenar os paths
spec.paths = Object.fromEntries(
  Object.entries(spec.paths).sort(([a], [b]) => a.localeCompare(b))
);

fs.writeFileSync(outputPath, yaml.dump(spec, { noRefs: true, sortKeys: false }));
console.log('Swagger unificado gerado com sucesso!');