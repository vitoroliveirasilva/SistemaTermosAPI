const usuarioRepository = require('../repositories/usuarioRepository');
const filialRepository = require('../repositories/filialRepository');
const {
    validarDados
} = require('../utils/validator');
const {
    usuarioSchema,
    usuarioUpdateSchema
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

    async criarEmMassa(usuarios) {
        try {
            if (!Array.isArray(usuarios) || usuarios.length === 0) {
                throw new Error("A lista de usuários é inválida.");
            }

            const usuariosCriados = [];
            const usuariosIgnorados = [];
            const falhas = [];

            for (const usuario of usuarios) {
                try {
                    validarDados(usuario, usuarioSchema);

                    const usuarioExistente = await usuarioRepository.buscarPorFiltros({
                        email: usuario.email
                    });
                    if (usuarioExistente.length > 0) {
                        usuariosIgnorados.push({
                            email: usuario.email,
                            motivo: "E-mail já cadastrado"
                        });
                        continue;
                    }

                    usuario.senha = await bcrypt.hash(usuario.senha, 10);
                    usuario.status = 'ativo';

                    const novoUsuario = await usuarioRepository.criar(usuario);
                    usuariosCriados.push(novoUsuario);
                } catch (error) {
                    falhas.push({
                        usuario,
                        motivo: error.message
                    });
                }
            }

            return {
                totalCriados: usuariosCriados.length,
                totalIgnorados: usuariosIgnorados.length,
                totalFalhas: falhas.length,
                usuariosCriados,
                usuariosIgnorados,
                falhas
            };
        } catch (error) {
            console.error("Erro ao criar usuários em massa:", error);
            throw new Error("Erro ao criar usuários em massa.");
        }
    }

    async listar(filtros = {}) {
        return await usuarioRepository.listar(filtros);
    }

    async buscarPorId(id) {
        return await usuarioRepository.buscarPorId(id);
    }

    async atualizar(id, dados) {
        validarDados(dados, usuarioUpdateSchema);
        return await usuarioRepository.atualizar(id, dados);
    }

    async remover(id) {
        return await usuarioRepository.remover(id);
    }

    async vincularFilial(idUsuario, idFilial) {
        try {
            if (!idUsuario || isNaN(idUsuario) || idUsuario <= 0) {
                throw new Error("ID do usuário inválido.");
            }

            if (!idFilial || isNaN(idFilial) || idFilial <= 0) {
                throw new Error("ID da filial inválido.");
            }

            const usuario = await usuarioRepository.buscarPorId(idUsuario);
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }

            const filial = await filialRepository.buscarPorId(idFilial);
            if (!filial) {
                throw new Error("Filial não encontrada.");
            }

            return await usuarioRepository.vincularFilial(idUsuario, idFilial);
        } catch (error) {
            console.error(`Erro ao vincular usuário ${idUsuario} à filial ${idFilial}:`, error);
            throw error;
        }
    }

    async vincularMultiplosUsuarios(idFilial, usuarios) {
        try {
            if (!idFilial || isNaN(idFilial) || idFilial <= 0) {
                throw new Error("ID da filial inválido.");
            }

            const filial = await filialRepository.buscarPorId(idFilial);
            if (!filial) {
                throw new Error("Filial não encontrada.");
            }

            if (!Array.isArray(usuarios) || usuarios.length === 0) {
                throw new Error("A lista de usuários é inválida.");
            }

            const usuariosVinculados = [];
            const usuariosIgnorados = [];
            const falhas = [];

            for (const idUsuario of usuarios) {
                if (!idUsuario || isNaN(idUsuario) || idUsuario <= 0) {
                    falhas.push({
                        idUsuario,
                        motivo: "ID de usuário inválido"
                    });
                    continue;
                }

                try {
                    const usuario = await usuarioRepository.buscarPorId(idUsuario);
                    if (!usuario) {
                        usuariosIgnorados.push({
                            idUsuario,
                            motivo: "Usuário não encontrado"
                        });
                        continue;
                    }

                    const usuarioAtualizado = await usuarioRepository.vincularFilial(idUsuario, idFilial);
                    if (usuarioAtualizado) {
                        usuariosVinculados.push(usuarioAtualizado);
                    } else {
                        falhas.push({
                            idUsuario,
                            motivo: "Erro ao atualizar no banco de dados"
                        });
                    }
                } catch (error) {
                    falhas.push({
                        idUsuario,
                        motivo: error.message
                    });
                }
            }

            return {
                totalVinculados: usuariosVinculados.length,
                totalIgnorados: usuariosIgnorados.length,
                totalFalhas: falhas.length,
                usuariosVinculados,
                usuariosIgnorados,
                falhas
            };
        } catch (error) {
            console.error(`Erro ao vincular múltiplos usuários à filial ${idFilial}:`, error);
            throw new Error("Erro ao vincular múltiplos usuários à filial.");
        }
    }

}

module.exports = new UsuarioService();