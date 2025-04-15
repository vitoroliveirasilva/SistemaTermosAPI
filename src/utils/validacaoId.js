function validarId(id) {
    const numId = parseInt(id, 10);

    const valido = Number.isInteger(numId) && numId > 0;

    if (!valido) {
        console.error(`ID inválido recebido: ${id}`);
        return {
            valido: false,
            mensagem: `O ID "${id}" é inválido. Deve ser um número inteiro positivo.`,
        };
    }

    return {
        valido: true
    };
}

module.exports = {
    validarId
};