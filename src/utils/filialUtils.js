const filialRepository = require('../repositories/filialRepository');

/*
 * Valida a unicidade da filial.
 * @param {Object} dados - Objeto de entrada.
 * @returns {Promise<void>}
 * @throws {Object} - Objeto de erro com status e mensagem.
*/
async function unicidadeFilial(dados) {
    const [nomeExistente, enderecoExistente] = await Promise.all([
        filialRepository.buscarPorFiltros({
            nome: dados.nome
        }),
        filialRepository.buscarPorFiltros({
            endereco: dados.endereco
        })
    ]);

    if (nomeExistente.length > 0 && enderecoExistente.length > 0) {
        throw {
            status: 400,
            message: 'Nome e endereço já cadastrados'
        };
    } else if (nomeExistente.length > 0) {
        throw {
            status: 400,
            message: 'Nome já cadastrado'
        };
    } else if (enderecoExistente.length > 0) {
        throw {
            status: 400,
            message: 'Endereço já cadastrado'
        };
    }
}

module.exports = {
    unicidadeFilial
};