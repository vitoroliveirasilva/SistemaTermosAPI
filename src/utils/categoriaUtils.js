const categoriaRepository = require('../repositories/categoriaRepository');
const {
    categoriaSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade da categoria, verificando se nome já existe no banco de dados.
 * @param {Object} dados - Dados da categoria contendo nome.
 * @param {number|null} [id=null] - ID da categoria para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeCategoria(dados, id = null) {
    // Validação dos dados com base no schema JOI da categoria
    validarDados(dados, categoriaSchema);

    // Busca todas as categorias com o mesmo nome
    const categoriasExistentes = await categoriaRepository.buscarPorFiltros({
        nome: dados.nome
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const categoriasFiltradas = categoriasExistentes.filter(categoria => categoria.id !== id);

    // Verifica conflitos
    const erros = [];
    if (categoriasFiltradas.some(f => f.nome === dados.nome)) {
        erros.push({
            campo: 'nome',
            mensagem: 'Nome já cadastrado.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeCategoria
};