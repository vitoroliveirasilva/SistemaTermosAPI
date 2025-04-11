const validarQueryParams = require('../QueryParams/validarQueryParams');

module.exports = validarQueryParams(
  ['usuario_id', 'equipamento_id', 'criador_id', 'tipo_id', 'status_id'],
  null,
  'Informe pelo menos um filtro (usuário, equipamento, criador, tipo ou status).'
);