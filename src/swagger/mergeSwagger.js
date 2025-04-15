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
  components: {
    schemas: {}
  }
};

/**
 * Lê todos os arquivos .swagger.yaml recursivamente e junta no objeto spec
 */
function processYamlFilesRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processYamlFilesRecursively(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith('.swagger.yaml')) {
      try {
        const fileData = yaml.load(fs.readFileSync(fullPath, 'utf8'));

        // Adiciona tags
        if (fileData.tags) {
          fileData.tags.forEach(tag => {
            if (!spec.tags.some(t => t.name === tag.name)) {
              spec.tags.push(tag);
            }
          });
        }

        // Adiciona paths
        if (fileData.paths) {
          for (const [route, operations] of Object.entries(fileData.paths)) {
            spec.paths[route] = {
              ...(spec.paths[route] || {}),
              ...operations
            };
          }
        }

        // Adiciona components.schemas
        if (fileData.components?.schemas) {
          spec.components.schemas = {
            ...spec.components.schemas,
            ...fileData.components.schemas
          };
        }

      } catch (err) {
        console.error(`❌ Erro ao processar ${fullPath}:`, err.message);
      }
    }
  }
}

// Inicia leitura dos arquivos
processYamlFilesRecursively(docsDir);

// Ordena tags, paths e schemas
spec.tags.sort((a, b) => a.name.localeCompare(b.name));
spec.paths = Object.fromEntries(Object.entries(spec.paths).sort(([a], [b]) => a.localeCompare(b)));

if (spec.components.schemas) {
  spec.components.schemas = Object.fromEntries(
    Object.entries(spec.components.schemas).sort(([a], [b]) => a.localeCompare(b))
  );
}

// Escreve o arquivo unificado
fs.writeFileSync(outputPath, yaml.dump(spec, { noRefs: true, sortKeys: false }));
console.log('Swagger unificado gerado com sucesso!');
