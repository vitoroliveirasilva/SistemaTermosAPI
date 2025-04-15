const validarQueryParams = require('../validarQueryParams');

module.exports = validarQueryParams(
  ['categoria_id', 'marca', 'modelo', 'descricao'],
  null,
  'Informe pelo menos um filtro (categoria, marca, modelo ou descrição).'
);