import "../docs/auth.docs";

import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

export { router as authRoutes };
