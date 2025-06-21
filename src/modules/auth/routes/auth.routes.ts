import "../docs/auth.docs";

import { Router } from "express";
import AuthController from "../controller/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.post(
  "/register",
  // AuthMiddleware.optional,
  AuthController.register
);

router.post("/login", AuthController.login);

export { router as authRoutes };
