import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { productRoutes } from "../modules/auth/routes/product.routes";
import { withdrawalRoutes } from "../modules/auth/routes/withdrawl.route";
import { userRoutes } from "../modules/user/routes/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/withdrawal", withdrawalRoutes);

export { router };
