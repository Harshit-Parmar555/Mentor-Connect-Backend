import { Router } from "express";
import { approveRequest } from "../controllers/session.controller";
const router = Router();

router.post("/approve-request", approveRequest);

export default router;
