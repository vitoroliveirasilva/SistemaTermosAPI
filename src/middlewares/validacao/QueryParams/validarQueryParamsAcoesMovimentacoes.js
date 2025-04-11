const validarQueryParams = require('../QueryParams/validarQueryParams');

module.exports = validarQueryParams(
  ['nome', 'descricao'],
  null,
  'Para continuar, por favor, informe pelo menos um filtro (nome ou descrição).'
);