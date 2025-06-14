/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de Usuário (Master ou Farmacêutico)
 *     description: Permite criar usuários do sistema. Criação de Master requer Master Key. Criação de Common requer token de Master logado.
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

import { Router } from "express";
import AuthController from "../controller/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.post(
  "/register",
  // AuthMiddleware.optional,
  AuthController.register
);

export { router as authRoutes };
