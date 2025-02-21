const filialService = require('../../src/services/filialService');
const filialRepository = require('../../src/repositories/filialRepository');

jest.mock('../../src/repositories/filialRepository');

describe('FilialService', () => {
    const filialMock = {
        id: 1,
        nome: "Filial Teste",
        endereco: "Rua dos Testes, 123"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve criar uma filial com sucesso', async () => {
        filialRepository.buscarPorFiltros.mockResolvedValue([]); // Garante retorno válido
        filialRepository.criar.mockResolvedValue(filialMock);

        const result = await filialService.criar(filialMock);

        expect(result).toEqual(filialMock);
        expect(filialRepository.criar).toHaveBeenCalledWith(filialMock);
    });

    test('Deve listar todas as filiais', async () => {
        filialRepository.listar.mockResolvedValue([filialMock]);

        const result = await filialService.listar();

        expect(result).toEqual([filialMock]);
        expect(filialRepository.listar).toHaveBeenCalled();
    });

    test('Deve buscar uma filial por ID', async () => {
        filialRepository.buscarPorId.mockResolvedValue(filialMock);

        const result = await filialService.buscarPorId(1);

        expect(result).toEqual(filialMock);
        expect(filialRepository.buscarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao buscar uma filial inexistente', async () => {
        filialRepository.buscarPorId.mockResolvedValue(null);

        await expect(filialService.buscarPorId(999)).rejects.toEqual({
            status: 404,
            message: 'ID 999 não encontrado.'
        });
    });

    test('Deve atualizar uma filial', async () => {
        const novosDados = {
            nome: "Filial Atualizada"
        };
        filialRepository.buscarPorId.mockResolvedValue(filialMock);
        filialRepository.buscarPorFiltros.mockResolvedValue([]); // Evita erro no filter()
        filialRepository.atualizar.mockResolvedValue({
            ...filialMock,
            ...novosDados
        });

        const result = await filialService.atualizar(1, novosDados);

        expect(result).toEqual({
            ...filialMock,
            ...novosDados
        });
        expect(filialRepository.atualizar).toHaveBeenCalledWith(1, novosDados);
    });

    test('Deve remover uma filial', async () => {
        filialRepository.buscarPorId.mockResolvedValue(filialMock);
        filialRepository.remover.mockResolvedValue();

        const result = await filialService.remover(1);

        expect(result).toEqual({
            status: 204,
            message: "ID 1 removido com sucesso."
        });
        expect(filialRepository.remover).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao remover uma filial inexistente', async () => {
        filialRepository.buscarPorId.mockResolvedValue(null);

        await expect(filialService.remover(999)).rejects.toEqual({
            status: 404,
            message: "ID 999 não encontrado."
        });
    });
});