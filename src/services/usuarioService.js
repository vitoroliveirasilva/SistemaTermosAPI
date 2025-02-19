const usuarioRepository = require('../repositories/usuarioRepository');
const {
    validarDados
} = require('../utils/validator');
const {
    usuarioSchema
} = require('../validations/usuarioSchema');
const bcrypt = require('bcrypt');


class UsuarioService {
    async criar(dados) {
        validarDados(dados, usuarioSchema);

        const usuarioExistente = await usuarioRepository.buscarPorFiltros({
            email: dados.email
        });
        if (usuarioExistente.length > 0) {
            throw new Error('E-mail já cadastrado');
        }

        dados.senha = await bcrypt.hash(dados.senha, 10);
        dados.status = 'ativo';

        return await usuarioRepository.criar(dados);
    }

    async listar(filtros = {}) {
        return await usuarioRepository.listar(filtros);
    }

    async buscarPorId(id) {
        return await usuarioRepository.buscarPorId(id);
    }

    async atualizar(id, dados) {
        validarDados(dados, usuarioSchema);
        return await usuarioRepository.atualizar(id, dados);
    }

    async remover(id) {
        return await usuarioRepository.remover(id);
    }
}

module.exports = new UsuarioService();