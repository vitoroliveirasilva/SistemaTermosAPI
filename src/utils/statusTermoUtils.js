const statusTermoRepository = require('../repositories/statusTermoRepository');
const {
    statusTermoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade do status do termo, verificando se nome já existem no banco de dados.
 * @param {Object} dados - Dados do status do termo contendo nome.
 * @param {number|null} [id=null] - ID do status do termo para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeStatusTermo(dados, id = null) {
    // Validação dos dados com base no schema JOI
    validarDados(dados, statusTermoSchema);

    // Busca todas os status dos termos com o mesmo nome
    const statusTermosExistentes = await statusTermoRepository.buscarPorFiltros({
        nome: dados.nome
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const statusTermosFiltradas = statusTermosExistentes.filter(filial => filial.id !== id);

    // Verifica conflitos
    const erros = [];
    if (statusTermosFiltradas.some(f => f.nome === dados.nome)) {
        erros.push({
            campo: 'nome',
            mensagem: 'Nome já cadastrado.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeStatusTermo
};