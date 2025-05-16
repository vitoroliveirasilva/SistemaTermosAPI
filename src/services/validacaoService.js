const BaseService = require('./baseService');

class ValidatedService extends BaseService {
    constructor(repository, nomeEntidade, validadorUnicidade) {
        super(repository, nomeEntidade);
        this.validadorUnicidade = validadorUnicidade;
    }

    async criar(dados) {
        await this.#validarUnicidade(dados);
        return super.criar(dados);
    }

    async atualizar(id, dados) {
        const registroAtual = await super.buscarPorId(id);

        await this.#validarUnicidade(dados, registroAtual.id);

        return super.atualizar(id, dados);
    }

    async #validarUnicidade(dados, id = null) {
        const errosValidacao = await this.validadorUnicidade(dados, id);

        if (Array.isArray(errosValidacao) && errosValidacao.length > 0) {
            const camposValidos = errosValidacao
                .filter(e => e && e.campo)
                .map(e => e.campo);

            const camposStr = camposValidos.join(', ');
            const prefixo = camposValidos.length > 1 ? 'nos campos' : 'no campo';
            const mensagem =
                camposValidos.length > 0
                    ? `Erro de unicidade ${prefixo}: ${camposStr}`
                    : 'Erro de unicidade: dados duplicados.';

            throw {
                status: 400,
                message: mensagem,
                erros: errosValidacao
            };
        }
    }

}

module.exports = ValidatedService;