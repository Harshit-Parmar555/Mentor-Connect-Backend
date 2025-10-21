import { Router } from "express";
import {
  createRequest,
  getRequestsForMentor,
  getRequestForStudent,
} from "../controllers/request.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { checkOnBoarded } from "../middlewares/onBoard.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
const router = Router();

router.post(
  "/create",
  authenticate,
  checkOnBoarded,
  roleMiddleware("student"),
  createRequest
);
router.get(
  "/mentor",
  authenticate,
  checkOnBoarded,
  roleMiddleware("mentor"),
  getRequestsForMentor
);
router.get("/student", authenticate, checkOnBoarded, roleMiddleware("student"),getRequestForStudent);

export default router;
