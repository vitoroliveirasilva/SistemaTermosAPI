const equipamentoRepository = require('../repositories/equipamentoRepository');
const {
    equipamentoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade do equipamento, verificando se o numero de série já existe no banco de dados.
 * @param {Object} dados - Dados do equipamento contendo o numero de série.
 * @param {number|null} [id=null] - ID do equipamento para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeEquipamento(dados, id = null) {
    // Validação dos dados com base no schema JOI
    validarDados(dados, equipamentoSchema);

    // Busca todas as equipamentos com o mesmo numero de série
    const equipamentosExistentes = await equipamentoRepository.buscarPorFiltros({
        numero_serie: dados.numero_serie
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const equipamentosFiltradas = equipamentosExistentes.filter(equipamento => equipamento.id !== id);

    // Verifica conflitos
    const erros = [];
    if (equipamentosFiltradas.some(f => f.numero_serie === dados.numero_serie)) {
        erros.push({
            campo: 'numero_serie',
            mensagem: 'Número de série já cadastrado.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeEquipamento
};