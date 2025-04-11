const modeloRepository = require('../repositories/modeloRepository');
const {
    modeloSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade do modelo, verificando sa marca, modelo ou descrição já existem no banco de dados.
 * @param {Object} dados - Dados do modelo contendo marca, modelo e/ou descrição.
 * @param {number|null} [id=null] - ID do modelo para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeModelo(dados, id = null) {
    // Validação dos dados com base no schema JOI
    validarDados(dados, modeloSchema);

    // Busca todas as modelos com a mesma marca, modelo ou descrição
    const modelosExistentes = await modeloRepository.buscarPorFiltros({
        marca: dados.marca,
        modelo: dados.modelo,
        descricao: dados.descricao
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const modelosFiltradas = modelosExistentes.filter(modelo => modelo.id !== id);

    // Verifica conflitos
    const erros = [];
    if (modelosFiltradas.some(f => f.marca === dados.marca)) {
        erros.push({
            campo: 'marca',
            mensagem: 'Marca já cadastrada.'
        });
    }

    if (modelosFiltradas.some(f => f.modelo === dados.modelo)) {
        erros.push({
            campo: 'modelo',
            mensagem: 'Modelo já cadastrado.'
        });
    }

    if (modelosFiltradas.some(f => f.descricao === dados.descricao)) {
        erros.push({
            campo: 'descricao',
            mensagem: 'Descrição já cadastrada.'
        });
    }

    return erros;
}

module.exports = {
    validarUnicidadeModelo
};