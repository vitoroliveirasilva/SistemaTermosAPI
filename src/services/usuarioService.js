const usuarioRepository = require('../repositories/usuarioRepository');
const {
    validarDados
} = require('../utils/validator');
const {
    usuarioSchema
} = require('../validations/usuarioValidation');
const bcrypt = require('bcrypt');

async function cadastrarUsuario(dados) {
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

async function obterUsuario(id) {
    const usuario = await usuarioRepository.buscarUsuarioPorId(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    const {
        senha,
        ...usuarioSemSenha
    } = usuario.toJSON();
    return usuarioSemSenha;
}

async function listarUsuarios() {
    const usuarios = await usuarioRepository.listarUsuarios();
    return usuarios.map(({
        senha,
        ...usuarioSemSenha
    }) => usuarioSemSenha);
}

async function editarUsuario(id, dados) {
    validarDados(dados, usuarioSchema);
    const usuarioAtualizado = await usuarioRepository.atualizarUsuario(id, dados);
    if (!usuarioAtualizado) throw new Error('Usuário não encontrado para atualização');
    return usuarioAtualizado;
}

async function removerUsuario(id) {
    const usuarioRemovido = await usuarioRepository.deletarUsuario(id);
    if (!usuarioRemovido) throw new Error('Usuário não encontrado para exclusão');
    return usuarioRemovido;
}

module.exports = {
    cadastrarUsuario,
    obterUsuario,
    listarUsuarios,
    editarUsuario,
    removerUsuario
};