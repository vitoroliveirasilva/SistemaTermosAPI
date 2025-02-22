const categoriaService = require('../../src/services/categoriaService');
const categoriaRepository = require('../../src/repositories/categoriaRepository');

jest.mock('../../src/repositories/categoriaRepository');

describe('CategoriaService', () => {
    const categoriaMock = {
        id: 1,
        nome: "Categoria Teste",
        endereco: "Rua dos Testes, 123"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve criar uma categoria com sucesso', async () => {
        categoriaRepository.buscarPorFiltros.mockResolvedValue([]); // Garante retorno válido
        categoriaRepository.criar.mockResolvedValue(categoriaMock);

        const result = await categoriaService.criar(categoriaMock);

        expect(result).toEqual(categoriaMock);
        expect(categoriaRepository.criar).toHaveBeenCalledWith(categoriaMock);
    });

    test('Deve listar todas as categorias', async () => {
        categoriaRepository.listar.mockResolvedValue([categoriaMock]);

        const result = await categoriaService.listar();

        expect(result).toEqual([categoriaMock]);
        expect(categoriaRepository.listar).toHaveBeenCalled();
    });

    test('Deve buscar uma categoria por ID', async () => {
        categoriaRepository.buscarPorId.mockResolvedValue(categoriaMock);

        const result = await categoriaService.buscarPorId(1);

        expect(result).toEqual(categoriaMock);
        expect(categoriaRepository.buscarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao buscar uma categoria inexistente', async () => {
        categoriaRepository.buscarPorId.mockResolvedValue(null);

        await expect(categoriaService.buscarPorId(999)).rejects.toEqual({
            status: 404,
            message: 'ID 999 não encontrado.'
        });
    });

    test('Deve atualizar uma categoria', async () => {
        const novosDados = {
            nome: "Categoria Atualizada"
        };
        categoriaRepository.buscarPorId.mockResolvedValue(categoriaMock);
        categoriaRepository.buscarPorFiltros.mockResolvedValue([]); // Evita erro no filter()
        categoriaRepository.atualizar.mockResolvedValue({
            ...categoriaMock,
            ...novosDados
        });

        const result = await categoriaService.atualizar(1, novosDados);

        expect(result).toEqual({
            ...categoriaMock,
            ...novosDados
        });
        expect(categoriaRepository.atualizar).toHaveBeenCalledWith(1, novosDados);
    });

    test('Deve remover uma categoria', async () => {
        categoriaRepository.buscarPorId.mockResolvedValue(categoriaMock);
        categoriaRepository.remover.mockResolvedValue();

        const result = await categoriaService.remover(1);

        expect(result).toEqual({
            status: 204,
            message: "ID 1 removido com sucesso."
        });
        expect(categoriaRepository.remover).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao remover uma categoria inexistente', async () => {
        categoriaRepository.buscarPorId.mockResolvedValue(null);

        await expect(categoriaService.remover(999)).rejects.toEqual({
            status: 404,
            message: "ID 999 não encontrado."
        });
    });
});