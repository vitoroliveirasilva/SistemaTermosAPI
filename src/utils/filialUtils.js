const filialRepository = require('../repositories/filialRepository');
const {
    filialSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade da filial, verificando se nome ou endereço já existem no banco de dados.
 * @param {Object} dados - Dados da filial contendo nome e/ou endereço.
 * @param {number|null} [id=null] - ID da filial para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeFilial(dados, id = null) {
    // Validação dos dados com base no schema JOI da filial
    validarDados(dados, filialSchema);

    // Verifica o nome e endereço simultaneamente
    const filiaisExistentes = await filialRepository.buscarPorFiltros(dados);

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const filiaisFiltradas = filiaisExistentes.filter(filial => filial.id !== id);

    // Verifica conflitos para nome e endereço
    const nomeConflito = filiaisFiltradas.some(f => f.nome === nome);
    const enderecoConflito = filiaisFiltradas.some(f => f.endereco === endereco);

    // Define a mensagem de erro conforme os conflitos encontrados
    let erroMsg = null;
    if (nomeConflito && enderecoConflito) {
        erroMsg = 'Nome e endereço já cadastrados.';
    } else if (nomeConflito) {
        erroMsg = 'Nome já cadastrado.';
    } else if (enderecoConflito) {
        erroMsg = 'Endereço já cadastrado.';
    }

    // Lança erro se houver conflito de dados
    if (erroMsg) {
        const error = new Error(erroMsg);
        error.status = 400;
        throw error;
    }
}

module.exports = {
    validarUnicidadeFilial
};