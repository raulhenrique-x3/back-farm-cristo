import { Router } from "express";
import ProductController from "../../products/controller/ProductController";

const router = Router();

router.post("/create", ProductController.createProduct);
router.get("/get-all", ProductController.getAllProducts);
router.get("/get/:id", ProductController.getProductById);
router.get(
  "/get-by-category/:category",
  ProductController.getProductsByCategory
);
router.put("/edit/:id", ProductController.updateProduct);
router.delete("/delete/:id", ProductController.deleteProduct);
router.post("/register-products", ProductController.registerManyProducts);
router.put("/edit-products", ProductController.updateManyProducts);
router.post("/:id/stock/add", ProductController.postQuantityUpdate);

export { router as productRoutes };
