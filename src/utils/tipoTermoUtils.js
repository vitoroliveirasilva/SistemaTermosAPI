const tipoTermoRepository = require('../repositories/tipoTermoRepository');
const {
    tipoTermoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade do tipo de termo, verificando se nome já existe no banco de dados.
 * @param {Object} dados - Dados do tipo de termo contendo o nome.
 * @param {number|null} [id=null] - ID do tipo de termo para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeTipoTermo(dados, id = null) {
    // Validação dos dados com base no schema JOI
    validarDados(dados, tipoTermoSchema);

    // Busca todas as tiposTermos com o mesmo nome ou endereço
    const tiposTermosExistentes = await tipoTermoRepository.buscarPorFiltros({
        nome: dados.nome
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const tiposTermosFiltradas = tiposTermosExistentes.filter(tipoTermo => tipoTermo.id !== id);

    // Verifica conflitos
    const erros = [];
    if (tiposTermosFiltradas.some(f => f.nome === dados.nome)) {
        erros.push({
            campo: 'nome',
            mensagem: 'Nome já cadastrado.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeTipoTermo
};