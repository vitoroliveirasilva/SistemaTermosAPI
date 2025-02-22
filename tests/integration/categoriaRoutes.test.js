const request = require('supertest');
const app = require('../../src/app');
const {
    Categoria
} = require('../../src/models');
const sequelize = require('../../src/config/database');

describe('Categoria Routes', () => {
    let categoriaCriada;

    beforeAll(async () => {
        if (!sequelize) {
            throw new Error('Sequelize não foi inicializado corretamente.');
        }

        try {
            await sequelize.authenticate();
            await sequelize.sync({
                force: true
            });

            await new Promise(resolve => setTimeout(resolve, 500)); // Garante tempo para sincronização do banco

            categoriaCriada = await Categoria.create({
                nome: "Categoria Teste",
                endereco: "Rua dos Testes, 123"
            });
        } catch (error) {
            console.error('Erro ao inicializar Sequelize nos testes:', error);
            throw error;
        }
    });

    afterAll(async () => {
        if (sequelize && typeof sequelize.close === 'function') {
            await sequelize.close();
        }
    });

    test('Deve criar uma categoria', async () => {
        const response = await request(app)
            .post('/api/categorias')
            .send({
                nome: "Nova Categoria",
                endereco: "Rua Nova, 456"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("Nova Categoria");
    });

    test('Deve listar todas as categorias', async () => {
        const response = await request(app).get('/api/categorias');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve buscar uma categoria por ID', async () => {
        const response = await request(app).get(`/api/categorias/${categoriaCriada.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(categoriaCriada.id);
    });

    test('Deve retornar erro `404` ao buscar uma categoria inexistente', async () => {
        const response = await request(app).get('/api/categorias/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });

    test('Deve atualizar uma categoria', async () => {
        const response = await request(app)
            .put(`/api/categorias/${categoriaCriada.id}`)
            .send({
                nome: "Categoria Atualizada"
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Categoria Atualizada");
    });

    test('Deve remover uma categoria', async () => {
        const response = await request(app).delete(`/api/categorias/${categoriaCriada.id}`);

        expect(response.status).toBe(204);
    });

    test('Deve retornar erro `404` ao remover uma categoria inexistente', async () => {
        const response = await request(app).delete('/api/categorias/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });
});