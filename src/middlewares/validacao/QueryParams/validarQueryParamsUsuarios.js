const validarQueryParams = require('../QueryParams/validarQueryParams');

module.exports = validarQueryParams(
  ['nome', 'email', 'status'],
  (query) => {
    if (query.status && !['ativo', 'inativo', 'pendente'].includes(query.status.toLowerCase())) {
      throw new Error("Status inválido. Valores permitidos: ativo, inativo, pendente.");
    }
  },
  'Pelo menos um filtro (nome, email, status) deve ser informado.'
);