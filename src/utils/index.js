const {
  validarId
} = require('./validarId');
const {
  validarDados
} = require('./validator');
const {
  validarUnicidadeFilial
} = require('./filialUtils');
const {
  validarUnicidadeStatusTermo
} = require('./statusTermoUtils');
const {
  validarUnicidadeTemplateTermo
} = require('./templateTermoUtils');
const {
  validarUnicidadeStatusEquipamento
} = require('./statusEquipamentoUtils');
const {
  validarUnicidadeCategoria
} = require('./categoriaUtils');
const {
  validarUnicidadeAcaoMovimentacao
} = require('./acaoMovimentacaoUtils');
const {
  validarUnicidadeTipoTermo
} = require('./tipoTermoUtils');


module.exports = {
  validarId,
  validarDados,
  validarUnicidadeFilial,
  validarUnicidadeStatusTermo,
  validarUnicidadeTemplateTermo,
  validarUnicidadeStatusEquipamento,
  validarUnicidadeCategoria,
  validarUnicidadeAcaoMovimentacao,
  validarUnicidadeTipoTermo
};