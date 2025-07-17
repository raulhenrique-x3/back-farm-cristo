import { Router } from "express";
import ProductController from "../../products/controller/ProductController";

const router = Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);
router.post("/register-products", ProductController.registerManyProducts);
router.put("/edit-products", ProductController.updateManyProducts);

export { router as productRoutes };
