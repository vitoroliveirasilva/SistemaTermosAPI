const acaoMovimentacaoService = require('../../src/services/acaoMovimentacaoService');
const acaoMovimentacaoRepository = require('../../src/repositories/acaoMovimentacaoRepository');

jest.mock('../../src/repositories/acaoMovimentacaoRepository');

describe('AcaoMovimentacaoService', () => {
    const acaoMovimentacaoMock = {
        id: 1,
        nome: "AcaoMovimentacao Teste",
        endereco: "Rua dos Testes, 123"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve criar uma acaoMovimentacao com sucesso', async () => {
        acaoMovimentacaoRepository.buscarPorFiltros.mockResolvedValue([]); // Garante retorno válido
        acaoMovimentacaoRepository.criar.mockResolvedValue(acaoMovimentacaoMock);

        const result = await acaoMovimentacaoService.criar(acaoMovimentacaoMock);

        expect(result).toEqual(acaoMovimentacaoMock);
        expect(acaoMovimentacaoRepository.criar).toHaveBeenCalledWith(acaoMovimentacaoMock);
    });

    test('Deve listar todas as acoesMovimentacoes', async () => {
        acaoMovimentacaoRepository.listar.mockResolvedValue([acaoMovimentacaoMock]);

        const result = await acaoMovimentacaoService.listar();

        expect(result).toEqual([acaoMovimentacaoMock]);
        expect(acaoMovimentacaoRepository.listar).toHaveBeenCalled();
    });

    test('Deve buscar uma acaoMovimentacao por ID', async () => {
        acaoMovimentacaoRepository.buscarPorId.mockResolvedValue(acaoMovimentacaoMock);

        const result = await acaoMovimentacaoService.buscarPorId(1);

        expect(result).toEqual(acaoMovimentacaoMock);
        expect(acaoMovimentacaoRepository.buscarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao buscar uma acaoMovimentacao inexistente', async () => {
        acaoMovimentacaoRepository.buscarPorId.mockResolvedValue(null);

        await expect(acaoMovimentacaoService.buscarPorId(999)).rejects.toEqual({
            status: 404,
            message: 'ID 999 não encontrado.'
        });
    });

    test('Deve atualizar uma acaoMovimentacao', async () => {
        const novosDados = {
            nome: "AcaoMovimentacao Atualizada"
        };
        acaoMovimentacaoRepository.buscarPorId.mockResolvedValue(acaoMovimentacaoMock);
        acaoMovimentacaoRepository.buscarPorFiltros.mockResolvedValue([]); // Evita erro no filter()
        acaoMovimentacaoRepository.atualizar.mockResolvedValue({
            ...acaoMovimentacaoMock,
            ...novosDados
        });

        const result = await acaoMovimentacaoService.atualizar(1, novosDados);

        expect(result).toEqual({
            ...acaoMovimentacaoMock,
            ...novosDados
        });
        expect(acaoMovimentacaoRepository.atualizar).toHaveBeenCalledWith(1, novosDados);
    });

    test('Deve remover uma acaoMovimentacao', async () => {
        acaoMovimentacaoRepository.buscarPorId.mockResolvedValue(acaoMovimentacaoMock);
        acaoMovimentacaoRepository.remover.mockResolvedValue();

        const result = await acaoMovimentacaoService.remover(1);

        expect(result).toEqual({
            status: 204,
            message: "ID 1 removido com sucesso."
        });
        expect(acaoMovimentacaoRepository.remover).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro ao remover uma acaoMovimentacao inexistente', async () => {
        acaoMovimentacaoRepository.buscarPorId.mockResolvedValue(null);

        await expect(acaoMovimentacaoService.remover(999)).rejects.toEqual({
            status: 404,
            message: "ID 999 não encontrado."
        });
    });
});