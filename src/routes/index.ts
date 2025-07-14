import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { productRoutes } from "../modules/auth/routes/produto.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export { router };
