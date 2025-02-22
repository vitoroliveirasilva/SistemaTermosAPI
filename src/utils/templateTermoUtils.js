const templateTermoRepository = require('../repositories/templateTermoRepository');
const {
    templateTermoSchema
} = require('../validations');
const {
    validarDados
} = require('./validator');

/*
 * Valida a unicidade do template de termo, verificando se nome o já existe.
 * @param {Object} dados - Dados do template de termo contendo nome.
 * @param {number|null} [id=null] - ID do template de termo para ignorar na edição.
 * @throws {Error} - Erro com status HTTP 400 e mensagem descritiva caso já exista um registro com os mesmos dados.
*/
async function validarUnicidadeTemplateTermo(dados, id = null) {
    // Validação dos dados com base no schema JOI
    validarDados(dados, templateTermoSchema);

    // Busca todas os templatesTermos existentes com o mesmo nome
    const templatesTermosExistentes = await templateTermoRepository.buscarPorFiltros({
        nome: dados.nome
    });

    // Filtra os registros encontrados, ignorando o ID atual (só se houver um id pra ser filtrado)
    const templatesTermosFiltradas = templatesTermosExistentes.filter(templateTermo => templateTermo.id !== id);

    // Verifica conflitos
    const erros = [];
    if (templatesTermosFiltradas.some(f => f.nome === dados.nome)) {
        erros.push({
            campo: 'nome',
            mensagem: 'Nome já cadastrado.'
        });
    }
    
    return erros;
}

module.exports = {
    validarUnicidadeTemplateTermo
};