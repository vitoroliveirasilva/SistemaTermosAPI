const validarIds = require('./validacao/validarIds');
const errorHandler = require('./errorHandler');
const sanitizeRequest = require('./sanitizeMiddleware');


// === Middlewares de autenticação ===
const autenticacao = require('./auth/autenticacao');
const verificarPermissao = require('./auth/permissionamento');


// === QueryParams ===

// Equipamento
const validarQueryParamsCategoria = require('./validacao/QueryParams/equipamento/categoria');
const validarQueryParamsEquipamento = require('./validacao/QueryParams/equipamento/equipamento');
const validarQueryParamsEquipamentoStatus = require('./validacao/QueryParams/equipamento/equipamentoStatus');
const validarQueryParamsModelo = require('./validacao/QueryParams/equipamento/modelo');

// Histórico
const validarQueryParamsMovimentacaoAcao = require('./validacao/QueryParams/historico/movimentacaoAcao');
const validarQueryParamsMovimentacaoHistorico = require('./validacao/QueryParams/historico/movimentacaoHistorico');

// Organizacional
const validarQueryParamsFilial = require('./validacao/QueryParams/organizacional/filial');
const validarQueryParamsUsuario = require('./validacao/QueryParams/organizacional/usuario');

// Pdf
const validarQueryParamsTermoGerado = require('./validacao/QueryParams/pdf/termoGerado');
const validarQueryParamsTermoTemplate = require('./validacao/QueryParams/pdf/termoTemplate');

// Termo
const validarQueryParamsTermo = require('./validacao/QueryParams/termo/termo');
const validarQueryParamsTermoStatus = require('./validacao/QueryParams/termo/termoStatus');
const validarQueryParamsTermoTipo = require('./validacao/QueryParams/termo/termoTipo');


module.exports = {
  validarIds,
  errorHandler,
  sanitizeRequest,
  autenticacao,
  verificarPermissao,
  validarQueryParamsCategoria,
  validarQueryParamsEquipamento,
  validarQueryParamsEquipamentoStatus,
  validarQueryParamsModelo,
  validarQueryParamsMovimentacaoAcao,
  validarQueryParamsMovimentacaoHistorico,
  validarQueryParamsFilial,
  validarQueryParamsUsuario,
  validarQueryParamsTermoGerado,
  validarQueryParamsTermoTemplate,
  validarQueryParamsTermo,
  validarQueryParamsTermoStatus,
  validarQueryParamsTermoTipo
};