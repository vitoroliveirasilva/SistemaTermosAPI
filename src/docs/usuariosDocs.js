/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários na plataforma
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
 
/**
 * @swagger
 * /api/usuarios/filtros:
 *   get:
 *     summary: Filtra usuários com base em parâmetros
 *     tags: [Usuários]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do usuário a ser filtrado
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Email do usuário a ser filtrado
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status do usuário (ativo, inativo, pendente)
 *     responses:
 *       200:
 *         description: Lista de usuários filtrada retornada com sucesso.
 *       400:
 *         description: Filtros inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser buscado
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Dados inválidos na requisição.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/usuarios/filial/{id}/usuarios:
 *   post:
 *     summary: Vincula múltiplos usuários a uma filial
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da filial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarios
 *             properties:
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de usuários a serem vinculados
 *     responses:
 *       200:
 *         description: Usuários vinculados com sucesso à filial.
 *       400:
 *         description: Dados inválidos ou nenhum usuário válido encontrado.
 *       404:
 *         description: Filial não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/usuarios/lote:
 *   post:
 *     summary: Cria múltiplos usuários em massa
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarios
 *             properties:
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - nome
 *                     - email
 *                     - senha
 *                   properties:
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     senha:
 *                       type: string
 *                       format: password
 *     responses:
 *       201:
 *         description: Processamento concluído para a criação de usuários.
 *       400:
 *         description: Lista de usuários inválida.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/usuarios/{id}/filial/{filialId}:
 *   put:
 *     summary: Vincula um usuário a uma filial
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: path
 *         name: filialId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da filial
 *     responses:
 *       200:
 *         description: Usuário vinculado à filial com sucesso.
 *       400:
 *         description: IDs inválidos.
 *       404:
 *         description: Usuário ou filial não encontrados.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser removido
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
