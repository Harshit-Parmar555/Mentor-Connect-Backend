import Router from "express";
import { getAllMentor, getMentorById, getMentorByUsername } from "../controllers/mentor.controller";
import { checkOnBoarded } from "../middlewares/onBoard.middleware";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", authenticate, checkOnBoarded, getAllMentor);
router.get("/:id", authenticate, checkOnBoarded, getMentorById);
router.get("/username/:username", authenticate, checkOnBoarded, getMentorByUsername);

export default router;
