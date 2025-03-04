const acaoMovimentacaoRepository = require('../repositories/acaoMovimentacaoRepository');
const {
    acaoMovimentacaoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade da ação de movimentação, verificando se nomejá existe no banco de dados.
 * @param {Object} dados - Dados da ação de movimentação contendo o nome.
 * @param {number|null} [id=null] - ID da ação de movimentação para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeAcaoMovimentacao(dados, id = null) {
    // Validação dos dados com base no schema JOI
    validarDados(dados, acaoMovimentacaoSchema);

    // Busca todas as acoesMovimentacoes com o mesmo nome ou endereço
    const acoesMovimentacoesExistentes = await acaoMovimentacaoRepository.buscarPorFiltros({
        nome: dados.nome
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const acoesMovimentacoesFiltradas = acoesMovimentacoesExistentes.filter(acaoMovimentacao => acaoMovimentacao.id !== id);

    // Verifica conflitos
    const erros = [];
    if (acoesMovimentacoesFiltradas.some(f => f.nome === dados.nome)) {
        erros.push({
            campo: 'nome',
            mensagem: 'Nome já cadastrado.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeAcaoMovimentacao
};