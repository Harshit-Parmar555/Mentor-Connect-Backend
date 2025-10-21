import { Router } from "express";
import {
  approveRequest,
  declineRequest,
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

export default router;
