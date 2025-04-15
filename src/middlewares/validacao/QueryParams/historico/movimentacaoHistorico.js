const validarQueryParams = require('../validarQueryParams');

module.exports = validarQueryParams(
  ['equipamento_id', 'usuario_id', 'acao_id'],
  null,
  'Informe pelo menos um filtro (equipamento, usuário ou ação).'
);