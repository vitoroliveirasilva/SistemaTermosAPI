const statusEquipamentoService = require('../../src/services/statusEquipamentoService');
const statusEquipamentoRepository = require('../../src/repositories/statusEquipamentoRepository');

jest.mock('../../src/repositories/statusEquipamentoRepository');

describe('statusEquipamentoService', () => {
    const statusMock = {
        id: 1,
        nome: "Pendente"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve criar um status com sucesso', async () => {
        statusEquipamentoRepository.buscarPorFiltros.mockResolvedValue([]); // Evita conflitos de duplicação
        statusEquipamentoRepository.criar.mockResolvedValue(statusMock);

        const result = await statusEquipamentoService.criar(statusMock);

        expect(result).toEqual(statusMock);
        expect(statusEquipamentoRepository.criar).toHaveBeenCalledWith(statusMock);
    });

    test('Deve listar todos os statuss', async () => {
        statusEquipamentoRepository.listar.mockResolvedValue([statusMock]);

        const result = await statusEquipamentoService.listar();

        expect(result).toEqual([statusMock]);
        expect(statusEquipamentoRepository.listar).toHaveBeenCalled();
    });

    test('Deve buscar um status por ID', async () => {
        statusEquipamentoRepository.buscarPorId.mockResolvedValue(statusMock);

        const result = await statusEquipamentoService.buscarPorId(1);

        expect(result).toEqual(statusMock);
        expect(statusEquipamentoRepository.buscarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao buscar um status inexistente', async () => {
        statusEquipamentoRepository.buscarPorId.mockResolvedValue(null);

        await expect(statusEquipamentoService.buscarPorId(999)).rejects.toEqual({
            status: 404,
            message: 'ID 999 não encontrado.'
        });
    });

    test('Deve atualizar um status', async () => {
        const novosDados = {
            nome: "Assinado"
        };
        statusEquipamentoRepository.buscarPorId.mockResolvedValue(statusMock);
        statusEquipamentoRepository.buscarPorFiltros.mockResolvedValue([]); // Evita erro de duplicidade
        statusEquipamentoRepository.atualizar.mockResolvedValue({
            ...statusMock,
            ...novosDados
        });

        const result = await statusEquipamentoService.atualizar(1, novosDados);

        expect(result).toEqual({
            ...statusMock,
            ...novosDados
        });
        expect(statusEquipamentoRepository.atualizar).toHaveBeenCalledWith(1, novosDados);
    });

    test('Deve remover um status', async () => {
        statusEquipamentoRepository.buscarPorId.mockResolvedValue(statusMock);
        statusEquipamentoRepository.remover.mockResolvedValue();

        const result = await statusEquipamentoService.remover(1);

        expect(result).toEqual({
            status: 204,
            message: "ID 1 removido com sucesso."
        });
        expect(statusEquipamentoRepository.remover).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao remover um status inexistente', async () => {
        statusEquipamentoRepository.buscarPorId.mockResolvedValue(null);

        await expect(statusEquipamentoService.remover(999)).rejects.toEqual({
            status: 404,
            message: "ID 999 não encontrado."
        });
    });
});