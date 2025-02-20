const filialRepository = require('../repositories/filialRepository');

/*
 * Valida a unicidade da filial, verificando se nome ou endereço já existem.
 * @param {Object} dados - Dados da filial contendo nome e endereço.
 * @param {number|null} [id=null] - ID da filial para ignorar na edição.
 * @throws {Object} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeFilial(dados, id = null) {
    if (!dados || (!dados.nome && !dados.endereco)) {
        throw {
            status: 400,
            message: 'Dados inválidos para verificação de unicidade.'
        };
    }

    // Filtra as consultas para evitar requisições desnecessárias
    const consultas = [];
    if (dados.nome) consultas.push(filialRepository.buscarPorFiltros({
        nome: dados.nome
    }));
    if (dados.endereco) consultas.push(filialRepository.buscarPorFiltros({
        endereco: dados.endereco
    }));

    const resultados = await Promise.all(consultas);

    let nomeExistente = [],
        enderecoExistente = [];
    if (dados.nome) nomeExistente = resultados.shift();
    if (dados.endereco) enderecoExistente = resultados.shift();

    // Filtra para ignorar o próprio ID na edição
    const outroNomeExistente = nomeExistente.filter(filial => filial.id !== id);
    const outroEnderecoExistente = enderecoExistente.filter(filial => filial.id !== id);

    // Criar um objeto de erro com mensagens dinâmicas
    const erros = [];
    if (outroNomeExistente.length > 0) erros.push('Nome');
    if (outroEnderecoExistente.length > 0) erros.push('Endereço');

    if (erros.length > 0) {
        const mensagem = erros.length > 1 ?
            `${erros.join(' e ')} já cadastrados`
            :
            `${erros[0]} já cadastrado`;

        throw {
            status: 400,
            message: mensagem
        };
    }
}

module.exports = {
    validarUnicidadeFilial
};