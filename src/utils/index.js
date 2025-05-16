// Validaçõs gerais
const { validarId } = require('./validacaoId');
const { validarDados } = require('./validacaoSchema');
const { validarUnicidadeGenerica } = require('./validacaoUnicidadeGenerica');


// Autenticação
const { gerarAccessToken } = require('./auth/tokenUtil');
const { gerarRefreshToken } = require('./auth/tokenUtil');


// === Validações por entidade ===

// Equipamento
const { validarUnicidadeCategoria } = require('./equipamento/categoriaUtils');
const { validarUnicidadeEquipamento } = require('./equipamento/equipamentoUtils');
const { validarUnicidadeEquipamentoStatus } = require('./equipamento/equipamentoStatusUtils');
const { validarUnicidadeModelo } = require('./equipamento/modeloUtils');

// Histórico
const { validarUnicidadeMovimentacaoAcao } = require('./historico/movimentacaoAcaoUtils');
const { validarUnicidadeMovimentacaoHistorico } = require('./historico/movimentacaoHistoricoUtils');

// Organizacional
const { validarUnicidadeFilial } = require('./organizacional/filialUtils');

// Pdf
const { validarUnicidadeTermoGerado } = require('./pdf/termoGeradoUtils');
const { validarUnicidadeTermoTemplate } = require('./pdf/termoTemplateUtils');

// Termo
const { validarUnicidadeTermoStatus } = require('./termo/termoStatusUtils');
const { validarUnicidadeTermoTipo } = require('./termo/termoTipoUtils');
const { validarUnicidadeTermo } = require('./termo/termoUtils');


module.exports = {
  validarId,
  validarDados,
  validarUnicidadeGenerica,
  gerarAccessToken,
  gerarRefreshToken,
  validarUnicidadeCategoria,
  validarUnicidadeEquipamento,
  validarUnicidadeEquipamentoStatus,
  validarUnicidadeModelo,
  validarUnicidadeMovimentacaoAcao,
  validarUnicidadeMovimentacaoHistorico,
  validarUnicidadeFilial,
  validarUnicidadeTermoGerado,
  validarUnicidadeTermoTemplate,
  validarUnicidadeTermoStatus,
  validarUnicidadeTermoTipo,
  validarUnicidadeTermo
};