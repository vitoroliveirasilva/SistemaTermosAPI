const templateTermoService = require('../../src/services/templateTermoService');
const templateTermoRepository = require('../../src/repositories/templateTermoRepository');

jest.mock('../../src/repositories/templateTermoRepository');

describe('TemplateTermoService', () => {
    const templateMock = {
        id: 1,
        nome: "Template Teste",
        titulo: "Título Teste",
        subtitulo: "Subtítulo Teste",
        conteudo: "Este é um template de teste para termos de responsabilidade."
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve criar um template de termo com sucesso', async () => {
        templateTermoRepository.buscarPorFiltros.mockResolvedValue([]); // Garante retorno válido
        templateTermoRepository.criar.mockResolvedValue(templateMock);

        const result = await templateTermoService.criar(templateMock);

        expect(result).toEqual(templateMock);
        expect(templateTermoRepository.criar).toHaveBeenCalledWith(templateMock);
    });

    test('Deve listar todos os templates de termo', async () => {
        templateTermoRepository.listar.mockResolvedValue([templateMock]);

        const result = await templateTermoService.listar();

        expect(result).toEqual([templateMock]);
        expect(templateTermoRepository.listar).toHaveBeenCalled();
    });

    test('Deve buscar um template por ID', async () => {
        templateTermoRepository.buscarPorId.mockResolvedValue(templateMock);

        const result = await templateTermoService.buscarPorId(1);

        expect(result).toEqual(templateMock);
        expect(templateTermoRepository.buscarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao buscar um template inexistente', async () => {
        templateTermoRepository.buscarPorId.mockResolvedValue(null);

        await expect(templateTermoService.buscarPorId(999)).rejects.toEqual({
            status: 404,
            message: 'ID 999 não encontrado.'
        });
    });

    test('Deve atualizar um template de termo', async () => {
        const novosDados = {
            nome: "Template Atualizado",
            titulo: templateMock.titulo,
            conteudo: templateMock.conteudo
        };        
        templateTermoRepository.buscarPorId.mockResolvedValue(templateMock);
        templateTermoRepository.buscarPorFiltros.mockResolvedValue([]);
        templateTermoRepository.atualizar.mockResolvedValue({
            ...templateMock,
            ...novosDados
        });

        const result = await templateTermoService.atualizar(1, novosDados);

        expect(result).toEqual({
            ...templateMock,
            ...novosDados
        });
        expect(templateTermoRepository.atualizar).toHaveBeenCalledWith(1, novosDados);
    });

    test('Deve remover um template de termo', async () => {
        templateTermoRepository.buscarPorId.mockResolvedValue(templateMock);
        templateTermoRepository.remover.mockResolvedValue();

        const result = await templateTermoService.remover(1);

        expect(result).toEqual({
            status: 204,
            message: "ID 1 removido com sucesso."
        });
        expect(templateTermoRepository.remover).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao remover um template inexistente', async () => {
        templateTermoRepository.buscarPorId.mockResolvedValue(null);

        await expect(templateTermoService.remover(999)).rejects.toEqual({
            status: 404,
            message: "ID 999 não encontrado."
        });
    });
});