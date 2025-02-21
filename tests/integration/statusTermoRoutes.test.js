const request = require('supertest');
const app = require('../../src/app');
const {
    TermStatus
} = require('../../src/models');
const sequelize = require('../../src/config/database');

describe('TermStatus Routes', () => {
    let statusCriado;

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

            statusCriado = await TermStatus.create({
                nome: "Pendente"
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

    test('Deve criar um status de termo', async () => {
        const response = await request(app)
            .post('/api/statustermos')
            .send({
                nome: "Assinado"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("Assinado");
    });

    test('Deve listar todos os status de termos', async () => {
        const response = await request(app).get('/api/statustermos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve buscar um status de termo por ID', async () => {
        const response = await request(app).get(`/api/statustermos/${statusCriado.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(statusCriado.id);
    });

    test('Deve retornar erro `404` ao buscar um status inexistente', async () => {
        const response = await request(app).get('/api/statustermos/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });

    test('Deve atualizar um status de termo', async () => {
        const response = await request(app)
            .put(`/api/statustermos/${statusCriado.id}`)
            .send({
                nome: "Cancelado"
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Cancelado");
    });

    test('Deve remover um status de termo', async () => {
        const response = await request(app).delete(`/api/statustermos/${statusCriado.id}`);

        expect(response.status).toBe(204);
    });

    test('Deve retornar erro `404` ao remover um status inexistente', async () => {
        const response = await request(app).delete('/api/statustermos/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });
});