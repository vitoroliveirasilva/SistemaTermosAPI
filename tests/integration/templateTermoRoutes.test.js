const request = require('supertest');
const app = require('../../src/app');
const {
    TemplateTermo
} = require('../../src/models');
const sequelize = require('../../src/config/database');

describe('TemplateTermo Routes', () => {
    let templateCriado;

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

            templateCriado = await TemplateTermo.create({
                nome: "Template Teste",
                titulo: "Título Teste",
                subtitulo: "Subtítulo Teste",
                conteudo: "Este é um template de teste para termos de responsabilidade."
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

    test('Deve criar um template de termo', async () => {
        const response = await request(app)
            .post('/api/templatestermos')
            .send({
                nome: "Novo Template",
                titulo: "Novo Título",
                subtitulo: "Novo Subtítulo",
                conteudo: "Conteúdo do novo template de termo."
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("Novo Template");
    });

    test('Deve listar todos os templates', async () => {
        const response = await request(app).get('/api/templatestermos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve buscar um template por ID', async () => {
        const response = await request(app).get(`/api/templatestermos/${templateCriado.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(templateCriado.id);
    });

    test('Deve retornar erro `404` ao buscar um template inexistente', async () => {
        const response = await request(app).get('/api/templatestermos/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });

    test('Deve atualizar um template de termo', async () => {
        const response = await request(app)
            .put(`/api/templatestermos/${templateCriado.id}`)
            .send({
                nome: "Template Atualizado",
                titulo: templateCriado.titulo,
                conteudo: templateCriado.conteudo
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Template Atualizado");
    });

    test('Deve remover um template de termo', async () => {
        const response = await request(app).delete(`/api/templatestermos/${templateCriado.id}`);

        expect(response.status).toBe(204);
    });

    test('Deve retornar erro `404` ao remover um template inexistente', async () => {
        const response = await request(app).delete('/api/templatestermos/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe('ID 999 não encontrado.');
    });
});