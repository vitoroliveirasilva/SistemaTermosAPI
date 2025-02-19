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

        const usuarioExistente = await usuarioRepository.buscarUsuarioPorEmail(dados.email);
        if (usuarioExistente) {
            throw new Error('E-mail já cadastrado');
        }

        // Hash da senha antes de salvar
        dados.senha = await bcrypt.hash(dados.senha, 10);

        // Definir status como "ativo" ao criar um usuário
        dados.status = 'ativo';

        return await usuarioRepository.criarUsuario(dados);
    }

    async listar() {
        const usuarios = await usuarioRepository.listarUsuarios();
        return usuarios.map(({
            senha,
            ...usuarioSemSenha
        }) => usuarioSemSenha);
    }

    async buscarPorId(id) {
        const usuario = await usuarioRepository.buscarUsuarioPorId(id);
        if (!usuario) throw new Error('Usuário não encontrado');

        // Removendo a senha do retorno
        const {
            senha,
            ...usuarioSemSenha
        } = usuario.toJSON();
        return usuarioSemSenha;
    }

    async atualizar(id, dados) {
        validarDados(dados, usuarioSchema);
        const usuarioAtualizado = await usuarioRepository.atualizarUsuario(id, dados);
        if (!usuarioAtualizado) throw new Error('Usuário não encontrado para atualização');
        return usuarioAtualizado;
    }

    async remover(id) {
        const usuarioRemovido = await usuarioRepository.deletarUsuario(id);
        if (!usuarioRemovido) throw new Error('Usuário não encontrado para exclusão');
        return usuarioRemovido;
    }
}

module.exports = new UsuarioService();