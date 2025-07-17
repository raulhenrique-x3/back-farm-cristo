import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { withdrawalRoutes } from "../modules/auth/routes/withdrawl.route";
import { userRoutes } from "../modules/user/routes/user.routes";
import { productRoutes } from "../modules/products/routes/product.routes";
import { pharmaceuticalRoutes } from "../modules/pharmaceutical/routes/pharmaceutical.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/withdrawal", withdrawalRoutes);
router.use("/pharmaceutical", pharmaceuticalRoutes);

export { router };
