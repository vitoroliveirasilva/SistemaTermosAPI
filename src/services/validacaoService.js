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
        if (errosValidacao.length > 0) {
            throw {
                status: 400,
                message: errosValidacao.map(e => e.message).join(', '),
                errors: errosValidacao
            };
        }
    }

}

module.exports = ValidatedService;