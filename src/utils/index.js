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


module.exports = {
  validarId,
  validarDados,
  validarUnicidadeFilial,
  validarUnicidadeStatusTermo
};