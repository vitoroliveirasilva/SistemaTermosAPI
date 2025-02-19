const sinon = require("sinon");
const usuarioService = require("../../src/services/usuarioService");
const usuarioRepository = require("../../src/repositories/usuarioRepository");
const filialRepository = require("../../src/repositories/filialRepository");

describe("Usuário Service", () => {
    afterEach(() => {
        sinon.restore();
    });

    test("Deve criar um novo usuário", async () => {
        const usuarioFake = {
            nome: "Teste",
            email: "teste@example.com",
            senha: "Senha@123"
        };

        sinon.stub(usuarioRepository, "buscarPorFiltros").resolves([]);
        sinon.stub(usuarioRepository, "criar").resolves({
            id: 1,
            nome: usuarioFake.nome,
            email: usuarioFake.email
        });

        const result = await usuarioService.criar(usuarioFake);

        expect(result).toHaveProperty("id");
        expect(result.email).toBe(usuarioFake.email);
        expect(result).not.toHaveProperty("senha"); // 🔹 Garantia de que a senha não é retornada
    });

    test("Não deve criar um usuário com e-mail duplicado", async () => {
        const usuarioFake = {
            nome: "Teste",
            email: "teste@example.com",
            senha: "Senha@123"
        };

        sinon.stub(usuarioRepository, "buscarPorFiltros").resolves([usuarioFake]);

        await expect(usuarioService.criar(usuarioFake)).rejects.toThrow("E-mail já cadastrado");
    });

    test("Deve vincular um usuário a uma filial", async () => {
        const usuarioFake = {
            id: 1,
            nome: "Teste",
            filial_id: null
        };
        const filialFake = {
            id: 2,
            nome: "Filial Teste"
        };

        sinon.stub(usuarioRepository, "buscarPorId").resolves(usuarioFake);
        sinon.stub(filialRepository, "buscarPorId").resolves(filialFake);
        sinon.stub(usuarioRepository, "vincularFilial").resolves({
            ...usuarioFake,
            filial_id: 2
        });

        const result = await usuarioService.vincularFilial(1, 2);

        expect(result.filial_id).toBe(2);
    });

    test("Não deve vincular um usuário a uma filial inexistente", async () => {
        sinon.stub(usuarioRepository, "buscarPorId").resolves({
            id: 1,
            nome: "Teste",
            filial_id: null
        });
        sinon.stub(filialRepository, "buscarPorId").resolves(null);

        await expect(usuarioService.vincularFilial(1, 999)).rejects.toThrow("Filial não encontrada");
    });

    test("Não deve vincular um usuário inexistente a uma filial", async () => {
        sinon.stub(usuarioRepository, "buscarPorId").resolves(null);
        sinon.stub(filialRepository, "buscarPorId").resolves({
            id: 2,
            nome: "Filial Teste"
        });

        await expect(usuarioService.vincularFilial(999, 2)).rejects.toThrow("Usuário não encontrado");
    });
});