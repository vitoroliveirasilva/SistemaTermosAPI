const statusTermoService = require('../../src/services/statusTermoService');
const statusTermoRepository = require('../../src/repositories/statusTermoRepository');

jest.mock('../../src/repositories/statusTermoRepository');

describe('statusTermoService', () => {
    const statusMock = {
        id: 1,
        nome: "Pendente"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve criar um status com sucesso', async () => {
        statusTermoRepository.buscarPorFiltros.mockResolvedValue([]); // Evita conflitos de duplicação
        statusTermoRepository.criar.mockResolvedValue(statusMock);

        const result = await statusTermoService.criar(statusMock);

        expect(result).toEqual(statusMock);
        expect(statusTermoRepository.criar).toHaveBeenCalledWith(statusMock);
    });

    test('Deve listar todos os statuss', async () => {
        statusTermoRepository.listar.mockResolvedValue([statusMock]);

        const result = await statusTermoService.listar();

        expect(result).toEqual([statusMock]);
        expect(statusTermoRepository.listar).toHaveBeenCalled();
    });

    test('Deve buscar um status por ID', async () => {
        statusTermoRepository.buscarPorId.mockResolvedValue(statusMock);

        const result = await statusTermoService.buscarPorId(1);

        expect(result).toEqual(statusMock);
        expect(statusTermoRepository.buscarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao buscar um status inexistente', async () => {
        statusTermoRepository.buscarPorId.mockResolvedValue(null);

        await expect(statusTermoService.buscarPorId(999)).rejects.toEqual({
            status: 404,
            message: 'Status com ID 999 não encontrado.'
        });
    });

    test('Deve atualizar um status', async () => {
        const novosDados = {
            nome: "Assinado"
        };
        statusTermoRepository.buscarPorId.mockResolvedValue(statusMock);
        statusTermoRepository.buscarPorFiltros.mockResolvedValue([]); // Evita erro de duplicidade
        statusTermoRepository.atualizar.mockResolvedValue({
            ...statusMock,
            ...novosDados
        });

        const result = await statusTermoService.atualizar(1, novosDados);

        expect(result).toEqual({
            ...statusMock,
            ...novosDados
        });
        expect(statusTermoRepository.atualizar).toHaveBeenCalledWith(1, novosDados);
    });

    test('Deve remover um status', async () => {
        statusTermoRepository.buscarPorId.mockResolvedValue(statusMock);
        statusTermoRepository.remover.mockResolvedValue();

        const result = await statusTermoService.remover(1);

        expect(result).toEqual({
            status: 204,
            message: "Status com ID 1 removido com sucesso."
        });
        expect(statusTermoRepository.remover).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao remover um status inexistente', async () => {
        statusTermoRepository.buscarPorId.mockResolvedValue(null);

        await expect(statusTermoService.remover(999)).rejects.toEqual({
            status: 404,
            message: "Status com ID 999 não encontrado."
        });
    });
});