import Router from "express";
import { getAllMentor, getMentorById } from "../controllers/mentor.controller";
import { checkOnBoarded } from "../middlewares/onBoard.middleware";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", authenticate, checkOnBoarded, getAllMentor);
router.get("/:id", authenticate, checkOnBoarded, getMentorById);

export default router;
