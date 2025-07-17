import { Router } from "express";
import PharmaceuticalController from "../controller/PharmaceuticalController";

const router = Router();

router.get("/get-all", PharmaceuticalController.getAllPharmaceuticals);
router.get("/get/:id", PharmaceuticalController.getPharmaceuticalById);

export { router as pharmaceuticalRoutes };
