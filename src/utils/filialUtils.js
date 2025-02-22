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
    // Validação dos dados com base no schema JOI
    validarDados(dados, filialSchema);

    // Busca todas as filiais com o mesmo nome ou endereço
    const filiaisExistentes = await filialRepository.buscarPorFiltros({
        nome: dados.nome,
        endereco: dados.endereco
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const filiaisFiltradas = filiaisExistentes.filter(filial => filial.id !== id);

    // Verifica conflitos
    const erros = [];
    if (filiaisFiltradas.some(f => f.nome === dados.nome)) {
        erros.push({
            campo: 'nome',
            mensagem: 'Nome já cadastrado.'
        });
    }

    if (filiaisFiltradas.some(f => f.endereco === dados.endereco)) {
        erros.push({
            campo: 'endereco',
            mensagem: 'Endereço já cadastrado.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeFilial
};