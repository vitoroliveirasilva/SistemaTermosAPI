const request = require('supertest');
const app = require('../../src/app');
const {
    MovementAction
} = require('../../src/models');
const sequelize = require('../../src/config/database');

describe('AcaoMovimentacao Routes', () => {
    let acaoMovimentacaoCriada;

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

            acaoMovimentacaoCriada = await MovementAction.create({
                nome: "AcaoMovimentacao Teste",
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

    test('Deve criar uma acaoMovimentacao', async () => {
        const response = await request(app)
            .post('/api/acoesmovimentacoes')
            .send({
                nome: "Nova AcaoMovimentacao",
                endereco: "Rua Nova, 456"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("Nova AcaoMovimentacao");
    });

    test('Deve listar todas as acoesMovimentacoes', async () => {
        const response = await request(app).get('/api/acoesmovimentacoes');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve buscar uma acaoMovimentacao por ID', async () => {
        const response = await request(app).get(`/api/acoesmovimentacoes/${acaoMovimentacaoCriada.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(acaoMovimentacaoCriada.id);
    });

    test('Deve retornar erro `404` ao buscar uma acaoMovimentacao inexistente', async () => {
        const response = await request(app).get('/api/acoesmovimentacoes/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });

    test('Deve atualizar uma acaoMovimentacao', async () => {
        const response = await request(app)
            .put(`/api/acoesmovimentacoes/${acaoMovimentacaoCriada.id}`)
            .send({
                nome: "AcaoMovimentacao Atualizada"
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("AcaoMovimentacao Atualizada");
    });

    test('Deve remover uma acaoMovimentacao', async () => {
        const response = await request(app).delete(`/api/acoesmovimentacoes/${acaoMovimentacaoCriada.id}`);

        expect(response.status).toBe(204);
    });

    test('Deve retornar erro `404` ao remover uma acaoMovimentacao inexistente', async () => {
        const response = await request(app).delete('/api/acoesmovimentacoes/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });
});