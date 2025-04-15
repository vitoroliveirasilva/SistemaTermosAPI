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
 * @throws {Object} - Erro 400 com os campos duplicados e mensagem personalizada.
*/
async function validarUnicidadeGenerica(dados, schema, repository, camposParaValidar, id = null) {
    validarDados(dados, schema);

    const filtros = {};
    camposParaValidar.forEach(campo => {
        filtros[campo] = dados[campo];
    });

    const registrosExistentes = await repository.buscarPorFiltros(filtros);
    const registrosFiltrados = registrosExistentes.filter(reg => reg.id !== id);

    const erros = [];

    camposParaValidar.forEach(campo => {
        if (registrosFiltrados.some(r => r[campo] === dados[campo])) {
            erros.push({
                campo,
                mensagem: `${campo.charAt(0).toUpperCase() + campo.slice(1)} já cadastrado.`
            });
        }
    });

    if (erros.length > 0) {
        const campos = erros.map(e => e.campo).join(', ');
        const prefixo = erros.length > 1 ? 'nos campos' : 'no campo';

        throw {
            status: 400,
            message: `Erro de unicidade ${prefixo}: ${campos}`,
            erros
        };
    }
}

module.exports = {
    validarUnicidadeGenerica
};