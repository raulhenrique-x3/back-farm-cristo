import { Router } from "express";
import IdosoController from "../controller/IdosoController";

const router = Router();

router.post("/", IdosoController.create);
router.get("/", IdosoController.getAll);
router.get("/:id", IdosoController.getById);
router.put("/:id", IdosoController.update);
router.delete("/:id", IdosoController.delete);

export default router;