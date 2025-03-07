const validarIds = require('./validacao/validarIdsMiddleware');
const validarQueryParamsUsuarios = require('./validacao/validarQueryParamsUsuariosMiddleware');
const validarQueryParamsFiliais = require('./validacao/validarQueryParamsFiliaisMiddleware');
const validarQueryParamsCategorias = require('./validacao/validarQueryParamsCategoriasMiddleware');
const validarQueryParamsStatusTermo = require('./validacao/validarQueryParamsStatusTermoMiddleware');
const validarQueryParamsTemplatesTermos = require('./validacao/validarQueryParamsTemplatesTermosMiddleware');
const validarQueryParamsStatusEquipamentos = require('./validacao/validarQueryParamsStatusEquipamentosMiddleware');
const validarQueryParamsAcoesMovimentacoes = require('./validacao/validarQueryParamsAcoesMovimentacoesMiddleware');
const validarQueryParamsTiposTermos = require('./validacao/validarQueryParamsTiposTermosMiddleware');
const errorHandler = require('./errorHandler');

module.exports = {
  validarIds,
  validarQueryParamsUsuarios,
  validarQueryParamsFiliais,
  validarQueryParamsCategorias,
  validarQueryParamsStatusTermo,
  validarQueryParamsTemplatesTermos,
  validarQueryParamsStatusEquipamentos,
  validarQueryParamsAcoesMovimentacoes,
  validarQueryParamsTiposTermos,
  errorHandler
};