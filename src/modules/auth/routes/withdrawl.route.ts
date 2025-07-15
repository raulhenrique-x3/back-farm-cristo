import { Router } from "express";
import WithdrawalController from "../controller/WithdrawlController";

const router = Router();

router.post("/", WithdrawalController.createWithdrawal);
router.get("/", WithdrawalController.getWithdrawalsHistory);

export { router as withdrawalRoutes };