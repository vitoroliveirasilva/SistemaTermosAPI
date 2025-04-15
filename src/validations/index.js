// === Importações de Schemas ===

// Equipamento
const categoriaSchema = require('./equipamento/categoriaSchema');
const equipamentoSchema = require('./equipamento/equipamentoSchema');
const equipamentoStatusSchema = require('./equipamento/equipamentoStatusSchema');
const modeloSchema = require('./equipamento/modeloSchema');

// Histórico
const movimentacaoAcaoSchema = require('./historico/movimentacaoAcaoSchema');
const movimentacaoHistoricoSchema = require('./historico/movimentacaoHistoricoSchema');

// Organizacional
const filialSchema = require('./organizacional/filialSchema');
const usuarioSchema = require('./organizacional/usuarioSchema');

// Pdf
const termoGeradoSchema = require('./pdf/termoGeradoSchema');
const termoTemplateSchema = require('./pdf/termoTemplateSchema');

// Termo
const termoSchema = require('./termo/termoSchema');
const termoStatusSchema = require('./termo/termoStatusSchema');
const termoTipoSchema = require('./termo/termoTipoSchema');


module.exports = {
    categoriaSchema,
    equipamentoSchema,
    equipamentoStatusSchema,
    modeloSchema,
    movimentacaoAcaoSchema,
    movimentacaoHistoricoSchema,
    filialSchema,
    usuarioSchema,
    termoGeradoSchema,
    termoTemplateSchema,
    termoSchema,
    termoStatusSchema,
    termoTipoSchema
};