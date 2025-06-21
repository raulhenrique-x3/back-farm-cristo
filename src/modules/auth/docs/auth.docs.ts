/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de Usuário (Master ou Farmacêutico)
 *     description: Permite criar usuários do sistema. Criação de Master requer Master Key. Criação de Common requer token de Master logado.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [master, common]
 *     parameters:
 *       - in: header
 *         name: x-master-key
 *         schema:
 *           type: string
 *         description: Master Key (obrigatório apenas para criar Masters)
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na criação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de Usuário
 *     description: Permite que um usuário faça login no sistema.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: password@123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário autenticado
 *                   example: 6d87cfae-b0ec-4160...
 *                 token:
 *                   type: string
 *                   description: JWT token de autenticação
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   description: Token para renovar a sessão
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais incorretas
 */
