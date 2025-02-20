function validarId(id) {
    const numId = Number(id);

    if (isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
        console.error("ID inválido:", id);
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