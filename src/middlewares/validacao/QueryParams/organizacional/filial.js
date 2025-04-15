const validarQueryParams = require('../validarQueryParams');

module.exports = validarQueryParams(
  ['nome', 'endereco'],
  null,
  'Para continuar, por favor, informe pelo menos um filtro (nome ou endereço).'
);