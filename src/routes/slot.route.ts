import { Router } from "express";
import { addSlot, getSlotsByMentor } from "../controllers/slot.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { checkOnBoarded } from "../middlewares/onBoard.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
const router = Router();

router.post(
  "/add-slot",
  authenticate,
  checkOnBoarded,
  roleMiddleware("mentor"),
  addSlot
);
router.get("/mentor/:mentorId", authenticate, checkOnBoarded, getSlotsByMentor);

export default router;
