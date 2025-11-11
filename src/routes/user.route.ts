import { getUserByUsername } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();
router.get("/:username", getUserByUsername);

export default router;
