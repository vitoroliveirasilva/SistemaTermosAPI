const validarIds = require('./validacao/validarIds');
const errorHandler = require('./errorHandler');

// QueryParams
const validarQueryParamsUsuarios = require('./validacao/QueryParams/validarQueryParamsUsuarios');
const validarQueryParamsFiliais = require('./validacao/QueryParams/validarQueryParamsFiliais');
const validarQueryParamsCategorias = require('./validacao/QueryParams/validarQueryParamsCategorias');
const validarQueryParamsStatusTermo = require('./validacao/QueryParams/validarQueryParamsStatusTermo');
const validarQueryParamsTemplatesTermos = require('./validacao/QueryParams/validarQueryParamsTemplatesTermos');
const validarQueryParamsStatusEquipamentos = require('./validacao/QueryParams/validarQueryParamsStatusEquipamentos');
const validarQueryParamsAcoesMovimentacoes = require('./validacao/QueryParams/validarQueryParamsAcoesMovimentacoes');
const validarQueryParamsTiposTermos = require('./validacao/QueryParams/validarQueryParamsTiposTermos');
const validarQueryParamsEquipamentos = require('./validacao/QueryParams/validarQueryParamsEquipamentos');
const validarQueryParamsModelos = require('./validacao/QueryParams/validarQueryParamsModelos');
const validarQueryParamsHistoricoMovimentacoes = require('./validacao/QueryParams/validarQueryParamsHistoricoMovimentacoes');
const validarQueryParamsTermos = require('./validacao/QueryParams/validarQueryParamsTermos');
const validarQueryParamsTermosGerados = require('./validacao/QueryParams/validarQueryParamsTermosGerados');

module.exports = {
  validarIds,
  errorHandler,
  validarQueryParamsUsuarios,
  validarQueryParamsFiliais,
  validarQueryParamsCategorias,
  validarQueryParamsStatusTermo,
  validarQueryParamsTemplatesTermos,
  validarQueryParamsStatusEquipamentos,
  validarQueryParamsAcoesMovimentacoes,
  validarQueryParamsTiposTermos,
  validarQueryParamsEquipamentos,
  validarQueryParamsModelos,
  validarQueryParamsHistoricoMovimentacoes,
  validarQueryParamsTermos,
  validarQueryParamsTermosGerados
};