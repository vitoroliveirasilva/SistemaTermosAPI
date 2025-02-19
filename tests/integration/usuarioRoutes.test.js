const request = require("supertest");
const app = require("../../src/app");
const usuarioRepository = require("../../src/repositories/usuarioRepository");
const filialRepository = require("../../src/repositories/filialRepository");

jest.mock("../../src/repositories/usuarioRepository");
jest.mock("../../src/repositories/filialRepository");

describe("Usuário Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Deve criar um usuário via API", async () => {
        const usuarioFake = { nome: "Teste", email: "teste@example.com", senha: "1aY@2345678" };

        usuarioRepository.buscarPorFiltros.mockResolvedValue([]);
        usuarioRepository.criar.mockResolvedValue({ id: 1, nome: usuarioFake.nome, email: usuarioFake.email });

        const response = await request(app).post("/api/usuarios").send(usuarioFake);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.email).toBe(usuarioFake.email);
        expect(response.body).not.toHaveProperty("senha");
    });

    test("Deve listar usuários via API", async () => {
        const usuariosFake = [{ id: 1, nome: "Teste", email: "teste@example.com" }];

        usuarioRepository.listar.mockResolvedValue(usuariosFake);

        const response = await request(app).get("/api/usuarios");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(usuariosFake);
    });

    test("Deve buscar um usuário pelo ID", async () => {
        const usuarioFake = { id: 1, nome: "Teste", email: "teste@example.com" };

        usuarioRepository.buscarPorId.mockResolvedValue(usuarioFake);

        const response = await request(app).get("/api/usuarios/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(usuarioFake);
    });

    test("Deve retornar erro 404 ao buscar um usuário inexistente", async () => {
        usuarioRepository.buscarPorId.mockResolvedValue(null);

        const response = await request(app).get("/api/usuarios/999");

        expect(response.status).toBe(404);
        expect(response.body.erro).toBe("Usuário não encontrado");
    });

    test("Deve atualizar um usuário", async () => {
        const usuarioAtualizado = { nome: "Novo Nome", email: "novo@example.com" };

        usuarioRepository.buscarPorId.mockResolvedValue({ id: 1, nome: "Teste", email: "teste@example.com" });
        usuarioRepository.atualizar.mockResolvedValue({ id: 1, ...usuarioAtualizado });

        const response = await request(app).put("/api/usuarios/1").send(usuarioAtualizado);

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Novo Nome");
    });

    test("Deve excluir (desativar) um usuário", async () => {
        usuarioRepository.buscarPorId.mockResolvedValue({ id: 1, nome: "Teste", status: "ativo" });
        usuarioRepository.remover.mockResolvedValue({ id: 1, nome: "Teste", status: "inativo" });

        const response = await request(app).delete("/api/usuarios/1");

        expect(response.status).toBe(204);
    });

    test("Deve vincular múltiplos usuários a uma filial", async () => {
        const usuariosFake = [
            { id: 1, nome: "Teste 1", filial_id: null },
            { id: 2, nome: "Teste 2", filial_id: null }
        ];

        filialRepository.buscarPorId.mockResolvedValue({ id: 2, nome: "Filial Teste" });

        usuarioRepository.buscarPorId.mockImplementation(id => {
            return Promise.resolve(usuariosFake.find(u => u.id === id) || null);
        });

        usuarioRepository.vincularFilial.mockImplementation((idUsuario, idFilial) => {
            return Promise.resolve({ id: idUsuario, filial_id: idFilial });
        });

        const response = await request(app).post("/api/usuarios/filial/2/usuarios").send({ usuarios: [1, 2] });

        expect(response.status).toBe(200);
        expect(response.body.resultado.totalVinculados).toBe(2);
    });

    test("Não deve vincular usuários inexistentes a uma filial", async () => {
        filialRepository.buscarPorId.mockResolvedValue({ id: 2, nome: "Filial Teste" });

        usuarioRepository.buscarPorId.mockResolvedValue(null);

        const response = await request(app).post("/api/usuarios/filial/2/usuarios").send({ usuarios: [999, 1000] });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe("Nenhum usuário válido encontrado para vinculação.");
    });
});
