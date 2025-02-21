const validarIds = require('./validacao/validarIdsMiddleware');
const validarQueryParamsUsuarios = require('./validacao/validarQueryParamsUsuariosMiddleware');
const validarQueryParamsFiliais = require('./validacao/validarQueryParamsFiliaisMiddleware');
const validarQueryParamsStatusTermo = require('./validacao/validarQueryParamsStatusTermoMiddleware');
const errorHandler = require('./errorHandler');

module.exports = {
  validarIds,
  validarQueryParamsUsuarios,
  validarQueryParamsFiliais,
  validarQueryParamsStatusTermo,
  errorHandler
};