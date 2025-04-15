const validarQueryParams = require('../validarQueryParams');

module.exports = validarQueryParams(
  ['modelo_id', 'filial_id', 'status_id', 'numero_serie'],
  null,
  'Informe pelo menos um filtro (modelo, filial, status ou número de série).'
);