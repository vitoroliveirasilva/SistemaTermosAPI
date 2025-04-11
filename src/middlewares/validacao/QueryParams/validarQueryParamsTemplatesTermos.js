const validarQueryParams = require('../QueryParams/validarQueryParams');

module.exports = validarQueryParams(
  ['nome', 'titulo', 'subtitulo', 'conteudo'],
  null,
  'Para continuar, por favor, informe pelo menos um filtro (nome, título, subtítulo ou conteúdo).'
);