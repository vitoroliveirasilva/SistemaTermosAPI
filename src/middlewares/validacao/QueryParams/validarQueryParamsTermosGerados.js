const validarQueryParams = require('../QueryParams/validarQueryParams');

module.exports = validarQueryParams(
  ['termo_id', 'template_id'],
  null,
  'Informe pelo menos um filtro (termo ou template).'
);