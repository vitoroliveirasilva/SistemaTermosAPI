const statusEquipamentoRepository = require('../repositories/statusEquipamentoRepository');
const {
    statusEquipamentoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade do status de equipamento, verificando se nome já existe no banco de dados.
 * @param {Object} dados - Dados da statusEquipamento contendo nome.
 * @param {number|null} [id=null] - ID da statusEquipamento para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeStatusEquipamento(dados, id = null) {
    // Validação dos dados com base no schema JOI
    validarDados(dados, statusEquipamentoSchema);

    // Busca todas os status de equipamentos com o mesmo nome
    const statusEquipamentosExistentes = await statusEquipamentoRepository.buscarPorFiltros({
        nome: dados.nome
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const statusEquipamentosFiltradas = statusEquipamentosExistentes.filter(statusEquipamento => statusEquipamento.id !== id);

    // Verifica conflitos
    const erros = [];
    if (statusEquipamentosFiltradas.some(f => f.nome === dados.nome)) {
        erros.push({
            campo: 'nome',
            mensagem: 'Nome já cadastrado.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeStatusEquipamento
};