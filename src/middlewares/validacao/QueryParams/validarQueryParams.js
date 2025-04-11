/*
 * Middleware reutilizável para validar se ao menos um dos parâmetros esperados está presente.
 * Permite validações adicionais opcionais.
 * 
 * @param {Array<string>} camposObrigatorios - Lista de campos que devem estar presentes no `req.query`.
 * @param {Function} validacaoExtra - Função opcional que executa validações adicionais. Deve lançar erro se inválido.
 * @param {string} mensagemErro - Mensagem de erro personalizada (fallback padrão).
*/
function validarQueryParams(camposObrigatorios = [], validacaoExtra = null, mensagemErro = 'Informe pelo menos um filtro.') {
    return (req, res, next) => {
        const query = req.query;

        const algumPreenchido = camposObrigatorios.some(campo => query[campo]);

        if (!algumPreenchido) {
            return res.status(400).json({
                erro: mensagemErro
            });
        }

        if (typeof validacaoExtra === 'function') {
            try {
                validacaoExtra(query);
            } catch (error) {
                return res.status(400).json({
                    erro: error.message
                });
            }
        }

        next();
    };
}

module.exports = validarQueryParams;