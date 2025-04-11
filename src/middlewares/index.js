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
};