/**
 * @swagger
 * tags:
 *   name: Filiais
 *   description: Gerenciamento de filiais
 */

/**
 * @swagger
 * /api/filiais/:
 *   get:
 *     summary: Lista todas as filiais
 *     tags: [Filiais]
 *     responses:
 *       200:
 *         description: Lista de filiais retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/filiais/filtros:
 *   get:
 *     summary: Filtra filiais com base em parâmetros
 *     tags: [Filiais]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome da filial a ser filtrada
 *       - in: query
 *         name: endereco
 *         schema:
 *           type: string
 *         description: Endereço da filial a ser filtrado
 *     responses:
 *       200:
 *         description: Lista de filiais filtrada retornada com sucesso.
 *       400:
 *         description: Filtros inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/filiais/{id}:
 *   get:
 *     summary: Obtém uma filial pelo ID
 *     tags: [Filiais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da filial a ser buscada
 *     responses:
 *       200:
 *         description: Filial encontrada.
 *       404:
 *         description: Filial não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/filiais/:
 *   post:
 *     summary: Cria uma nova filial
 *     tags: [Filiais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - endereco
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filial criada com sucesso.
 *       400:
 *         description: Dados inválidos na requisição.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/filiais/{id}:
 *   put:
 *     summary: Atualiza uma filial pelo ID
 *     tags: [Filiais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da filial a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filial atualizada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Filial não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/filiais/{id}:
 *   delete:
 *     summary: Remove uma filial pelo ID
 *     tags: [Filiais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da filial a ser removida
 *     responses:
 *       204:
 *         description: Filial removida com sucesso.
 *       404:
 *         description: Filial não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
