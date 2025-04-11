const validarQueryParams = require('../QueryParams/validarQueryParams');

module.exports = validarQueryParams(
  ['nome'],
  null,
  'Para continuar, por favor, informe o nome do status do termo.'
);