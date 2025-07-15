import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { productRoutes } from "../modules/auth/routes/product.routes";
import { personRoutes } from "../modules/auth/routes/person.routes";
import { withdrawalRoutes } from "../modules/auth/routes/withdrawl.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/person", personRoutes);
router.use("/withdrawal", withdrawalRoutes);


export { router };
