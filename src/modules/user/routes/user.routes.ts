import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/get-all", UserController.getAllUsers);
router.get("/get-by/:id", UserController.getUserById);
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);
router.post("/get-by/:id/receive-product", UserController.addMedicinesToUser);

export { router as userRoutes };
