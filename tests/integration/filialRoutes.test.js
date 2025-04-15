const request = require('supertest');
const app = require('../../src/app');
const {
    Filial
} = require('../../src/models');
const sequelize = require('../../src/config/database');

describe('Filial Routes', () => {
    let filialCriada;

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

            filialCriada = await Filial.create({
                nome: "Filial Teste",
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

    test('Deve criar uma filial', async () => {
        const response = await request(app)
            .post('/api/filial')
            .send({
                nome: "Nova Filial",
                endereco: "Rua Nova, 456"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("Nova Filial");
    });

    test('Deve listar todas as filiais', async () => {
        const response = await request(app).get('/api/filial');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve buscar uma filial por ID', async () => {
        const response = await request(app).get(`/api/filial/${filialCriada.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(filialCriada.id);
    });

    test('Deve retornar erro `404` ao buscar uma filial inexistente', async () => {
        const response = await request(app).get('/api/filial/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });

    test('Deve atualizar uma filial', async () => {
        const response = await request(app)
            .put(`/api/filial/${filialCriada.id}`)
            .send({
                nome: "Filial Atualizada"
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Filial Atualizada");
    });

    test('Deve remover uma filial', async () => {
        const response = await request(app).delete(`/api/filial/${filialCriada.id}`);

        expect(response.status).toBe(204);
    });

    test('Deve retornar erro `404` ao remover uma filial inexistente', async () => {
        const response = await request(app).delete('/api/filial/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });
});