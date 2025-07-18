import { Router } from "express";
import WithdrawalController from "../controller/WithdrawlController";

const router = Router();

router.post("/donate", WithdrawalController.createWithdrawal);
router.get("/history", WithdrawalController.getWithdrawalsHistory);

export { router as withdrawalRoutes };
