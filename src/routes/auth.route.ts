import { Router } from "express";
import {
  signUp,
  onBoardUser,
  checkAuth,
  logout,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { uploadMedia } from "../middlewares/multer.file";
const router = Router();

router.post("/signup", signUp);
router.post("/logout", authenticate, logout);
router.post(
  "/onboard",
  authenticate,
  uploadMedia.single("profile"),
  onBoardUser
);
router.get("/check-auth", authenticate, checkAuth);

export default router;
