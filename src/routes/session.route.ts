import { Router } from "express";
import {
  approveRequest,
  declineRequest,
  getSessionDetails,
  updateSessionStatus,
} from "../controllers/session.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { checkOnBoarded } from "../middlewares/onBoard.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
const router = Router();

router.post(
  "/approve-request",
  authenticate,
  checkOnBoarded,
  roleMiddleware("mentor"),
  approveRequest
);
router.post(
  "/decline-request",
  authenticate,
  checkOnBoarded,
  roleMiddleware("mentor"),
  declineRequest
);
router.get("/:sessionId", authenticate, checkOnBoarded, getSessionDetails);
router.patch("/status", authenticate, checkOnBoarded, updateSessionStatus);

export default router;
