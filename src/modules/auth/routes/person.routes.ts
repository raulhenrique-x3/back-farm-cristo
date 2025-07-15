import { Router } from "express";
import PersonController from "../controller/PersonController";

const router = Router();

router.post("/", PersonController.createPerson);
router.get("/", PersonController.getAllPersons);
router.get("/:id", PersonController.getPersonById);
router.put("/:id", PersonController.updatePerson);
router.delete("/:id", PersonController.deletePerson);

router.post("/:id/receive-product", PersonController.addMedicinesToPerson);
router.post("/:id/donate-product", PersonController.addProductsToPerson);
router.post('/:id/associate-medicines', PersonController.associateExistingMedicinesToElderly);
router.post('/:id/associate-products', PersonController.associateExistingProductsToDonor);

export { router as personRoutes };
