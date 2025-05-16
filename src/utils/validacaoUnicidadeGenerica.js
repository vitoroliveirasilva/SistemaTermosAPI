const {
    validarDados
} = require('./validacaoSchema');

/*
 * Valida unicidade de qualquer entidade baseada em campos específicos.
 * @param {Object} dados - Dados da entidade a validar.
 * @param {Object} schema - Schema Joi para validação dos dados.
 * @param {Object} repository - Repositório com método buscarPorFiltros.
 * @param {Array<string>} camposParaValidar - Campos a serem verificados como únicos.
 * @param {number|null} id - ID opcional para ignorar o próprio registro na edição.
 * @returns {Array<{ campo: string, mensagem: string }>} - Lista de erros encontrados
*/
async function validarUnicidadeGenerica(dados, schema, repository, camposParaValidar, id = null) {
    // Valida dados com o schema (Joi)
    validarDados(dados, schema);

    // Prepara os filtros de consulta para verificar duplicidade
    const filtros = {};
    camposParaValidar.forEach(campo => {
        filtros[campo] = dados[campo];
    });

    // Busca os registros que já existem com os mesmos dados
    const registrosExistentes = await repository.buscarPorFiltros(filtros);
    const registrosFiltrados = registrosExistentes.filter(reg => reg.id !== id);

    const erros = [];

    camposParaValidar.forEach(campo => {
        const duplicado = registrosFiltrados.some(r => r[campo] === dados[campo]);
        if (duplicado) {
            erros.push({
                campo,
                mensagem: `${campo.charAt(0).toUpperCase() + campo.slice(1)} já cadastrado.`
            });
        }
    });

    // retorna lista de erros (ou [] se não houver)
    return erros;
}

module.exports = {
    validarUnicidadeGenerica
};