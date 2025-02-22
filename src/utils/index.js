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
  validarUnicidadeStatusEquipamento
} = require('./statusEquipamentoUtils');
const {
  validarUnicidadeCategoria
} = require('./categoriaUtils');


module.exports = {
  validarId,
  validarDados,
  validarUnicidadeFilial,
  validarUnicidadeStatusTermo,
  validarUnicidadeStatusEquipamento,
  validarUnicidadeCategoria
};